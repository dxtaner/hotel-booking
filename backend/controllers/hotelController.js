const Hotel = require("../models/Hotel");
const Booking = require("../models/Booking");

const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const getHotels = async (req, res) => {
  try {
    const { city, category, minPrice, maxPrice } = req.query;
    let query = {};

    if (city) {
      query["location.city"] = { $regex: escapeRegex(city), $options: "i" };
    }
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.pricePerNight = {};
      if (minPrice) query.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) query.pricePerNight.$lte = Number(maxPrice);
    }

    const hotels = await Hotel.find(query);
    res.status(200).json({ success: true, count: hotels.length, hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found." });
    }

    await Booking.updateMany(
      { hotel: req.params.id, status: { $ne: "cancelled" } },
      { $set: { status: "cancelled" } },
    );

    res.status(200).json({
      success: true,
      message: "Hotel deleted and related bookings cancelled.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found." });
    }
    res.status(200).json({ success: true, hotel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json({ success: true, message: "Hotel added.", hotel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!hotel) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found." });
    }
    res.status(200).json({ success: true, message: "Hotel updated.", hotel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
};
