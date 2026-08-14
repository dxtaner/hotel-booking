import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../api/axios";
import "./MyBookings.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/my-bookings");
      setBookings(res.data.bookings);
    } catch (err) {
      toast.error("Failed to retrieve bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;
    try {
      await API.put(`/bookings/${id}/cancel`);
      toast.success("Booking cancelled successfully.");
      fetchBookings();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "An error occurred during cancellation.",
      );
    }
  };

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "3rem" }}>Loading...</p>;

  return (
    <div className="mybookings-container">
      <h1 className="mybookings-title">My Bookings</h1>
      {bookings.length === 0 ? (
        <div className="mybookings-card" style={{ textAlign: "center" }}>
          <p style={{ color: "#64748b" }}>
            You don't have any active bookings yet.
          </p>
        </div>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} className="mybookings-card">
            <h2 className="mybookings-hotel-name">{booking.hotel?.name}</h2>
            <p className="mybookings-info">
              📅 <strong>Check-In:</strong>{" "}
              {new Date(booking.checkInDate).toLocaleDateString()} —{" "}
              <strong>Check-Out:</strong>{" "}
              {new Date(booking.checkOutDate).toLocaleDateString()}
            </p>
            <p className="mybookings-info">
              <strong>Total Price:</strong>{" "}
              <span className="mybookings-price">${booking.totalPrice}</span>
            </p>
            <p className="mybookings-info">
              <strong>Status:</strong>{" "}
              <span
                className={
                  booking.status === "cancelled"
                    ? "mybookings-status-cancelled"
                    : "mybookings-status-confirmed"
                }
              >
                {booking.status === "confirmed"
                  ? "Confirmed"
                  : booking.status === "cancelled"
                    ? "Cancelled"
                    : booking.status}
              </span>
            </p>
            {booking.status !== "cancelled" && (
              <button
                onClick={() => handleCancel(booking._id)}
                className="mybookings-btn-cancel"
              >
                Cancel Booking
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookings;
