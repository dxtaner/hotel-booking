import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "./HotelDetail.css";

const HotelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    checkInDate: "",
    checkOutDate: "",
    guests: 1,
  });

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await API.get(`/hotels/${id}`);
        setHotel(res.data.hotel);
      } catch (err) {
        toast.error("Hotel details could not be retrieved.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.info("Please sign in to make a booking.");
      return navigate("/login");
    }

    try {
      await API.post("/bookings", {
        hotelId: id,
        ...bookingData,
      });
      toast.success("Booking created successfully!");
      navigate("/my-bookings");
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed.");
    }
  };

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "3rem" }}>Loading...</p>;
  if (!hotel)
    return (
      <p style={{ textAlign: "center", marginTop: "3rem" }}>Hotel not found.</p>
    );

  return (
    <div className="detail-container">
      <h1 className="detail-title">{hotel.name}</h1>
      <p className="detail-location">
        📍 {hotel.location?.address}, {hotel.location?.city}
      </p>

      <img
        src={
          hotel.images?.[0] ||
          "https://images.unsplash.com/photo-1566073771259-6a8506099945"
        }
        alt={hotel.name}
        className="detail-img"
      />

      <div className="detail-description-box">
        <h3>Description</h3>
        <p className="detail-description">{hotel.description}</p>
        <p className="detail-price">Price: ${hotel.pricePerNight} / night</p>
      </div>

      <div className="booking-card">
        <h3>Book Now</h3>
        <form onSubmit={handleBooking} className="booking-form">
          <label>
            Check-In Date:
            <input
              type="date"
              required
              className="booking-input"
              value={bookingData.checkInDate}
              onChange={(e) =>
                setBookingData({ ...bookingData, checkInDate: e.target.value })
              }
            />
          </label>
          <label>
            Check-Out Date:
            <input
              type="date"
              required
              className="booking-input"
              value={bookingData.checkOutDate}
              onChange={(e) =>
                setBookingData({ ...bookingData, checkOutDate: e.target.value })
              }
            />
          </label>
          <label>
            Guests:
            <input
              type="number"
              min="1"
              required
              className="booking-input"
              value={bookingData.guests}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  guests: Number(e.target.value),
                })
              }
            />
          </label>
          <button type="submit" className="booking-btn">
            {user ? "Complete Booking" : "Sign In to Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HotelDetail;
