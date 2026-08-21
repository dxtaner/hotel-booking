const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");

const createBooking = async (req, res) => {
  try {
    const { hotelId, checkInDate, checkOutDate, guests } = req.body;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found." });
    }

    if (hotel.availableRooms <= 0) {
      return res.status(400).json({
        success: false,
        message: "No rooms available for this hotel.",
      });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn < today) {
      return res.status(400).json({
        success: false,
        message: "Check-in date cannot be in the past.",
      });
    }

    const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    if (days <= 0) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date.",
      });
    }

    const totalPrice = days * hotel.pricePerNight;

    const booking = await Booking.create({
      user: req.user._id,
      hotel: hotelId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guests,
      totalPrice,
    });

    hotel.availableRooms -= 1;
    await hotel.save();

    res.status(201).json({
      success: true,
      message: "The reservation has been successfully created.",
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const query = { _id: req.params.id };
    if (req.user.role !== "admin") {
      query.user = req.user._id;
    }

    const booking = await Booking.findOne(query);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Reservation not found." });
    }

    if (booking.status === "cancelled") {
      return res
        .status(400)
        .json({ success: false, message: "Reservation is already cancelled." });
    }

    booking.status = "cancelled";
    await booking.save();

    const hotel = await Hotel.findById(booking.hotel);
    if (hotel) {
      hotel.availableRooms += 1;
      await hotel.save();
    }

    res.status(200).json({
      success: true,
      message: "The reservation has been cancelled.",
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate(
      "hotel",
      "name location images pricePerNight",
    );
    res.status(200).json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("hotel", "name");

    res.status(200).json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  cancelBooking,
  getAllBookings,
};
