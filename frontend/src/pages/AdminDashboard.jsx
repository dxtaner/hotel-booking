import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../api/axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [hotelData, setHotelData] = useState({
    name: "",
    description: "",
    pricePerNight: "",
    address: "",
    city: "",
    country: "",
    images: "",
    totalRooms: 10,
    availableRooms: 10,
  });

  useEffect(() => {
    if (activeTab === "bookings") fetchAdminBookings();
  }, [activeTab]);

  const fetchAdminBookings = async () => {
    setLoading(true);
    try {
      const res = await API.get("/bookings/admin/all");
      setBookings(res.data.bookings || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateHotel = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: hotelData.name,
        description: hotelData.description,
        pricePerNight: Number(hotelData.pricePerNight),
        totalRooms: Number(hotelData.totalRooms),
        availableRooms: Number(hotelData.availableRooms),
        location: {
          address: hotelData.address,
          city: hotelData.city,
          country: hotelData.country,
        },
        images: hotelData.images
          ? hotelData.images.split(",").map((i) => i.trim())
          : [],
      };

      await API.post("/hotels", payload);
      toast.success("Hotel created successfully!");
      setActiveTab("bookings");
    } catch (err) {
      toast.error(err.response?.data?.message || "Creation failed.");
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Management Panel</h1>
      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === "bookings" ? "active" : ""}`}
          onClick={() => setActiveTab("bookings")}
        >
          All Bookings
        </button>
        <button
          className={`tab-btn ${activeTab === "add-hotel" ? "active" : ""}`}
          onClick={() => setActiveTab("add-hotel")}
        >
          Add New Hotel
        </button>
      </div>

      {activeTab === "bookings" ? (
        <div className="admin-table-wrapper">
          {loading ? (
            <p style={{ textAlign: "center", padding: "2rem" }}>Loading...</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Hotel</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td>
                      {b.user?.name}
                      <br />
                      <small>{b.user?.email}</small>
                    </td>
                    <td>{b.hotel?.name}</td>
                    <td>{new Date(b.checkInDate).toLocaleDateString()}</td>
                    <td>{new Date(b.checkOutDate).toLocaleDateString()}</td>
                    <td>${b.totalPrice}</td>
                    <td>
                      <span className={`status-badge ${b.status}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div className="admin-form-card">
          <h2>Create New Hotel</h2>
          <form onSubmit={handleCreateHotel} className="admin-form">
            <input
              type="text"
              placeholder="Hotel Name"
              required
              value={hotelData.name}
              onChange={(e) =>
                setHotelData({ ...hotelData, name: e.target.value })
              }
              className="admin-input"
            />
            <input
              type="number"
              placeholder="Price Per Night ($)"
              required
              value={hotelData.pricePerNight}
              onChange={(e) =>
                setHotelData({ ...hotelData, pricePerNight: e.target.value })
              }
              className="admin-input"
            />
            <div className="form-grid">
              <input
                type="number"
                placeholder="Total Rooms"
                required
                value={hotelData.totalRooms}
                onChange={(e) =>
                  setHotelData({ ...hotelData, totalRooms: e.target.value })
                }
                className="admin-input"
              />
              <input
                type="number"
                placeholder="Available Rooms"
                required
                value={hotelData.availableRooms}
                onChange={(e) =>
                  setHotelData({ ...hotelData, availableRooms: e.target.value })
                }
                className="admin-input"
              />
            </div>
            <textarea
              placeholder="Description"
              required
              value={hotelData.description}
              onChange={(e) =>
                setHotelData({ ...hotelData, description: e.target.value })
              }
              className="admin-input"
            />
            <input
              type="text"
              placeholder="Address"
              required
              value={hotelData.address}
              onChange={(e) =>
                setHotelData({ ...hotelData, address: e.target.value })
              }
              className="admin-input"
            />
            <input
              type="text"
              placeholder="City"
              required
              value={hotelData.city}
              onChange={(e) =>
                setHotelData({ ...hotelData, city: e.target.value })
              }
              className="admin-input"
            />
            <input
              type="text"
              placeholder="Country"
              required
              value={hotelData.country}
              onChange={(e) =>
                setHotelData({ ...hotelData, country: e.target.value })
              }
              className="admin-input"
            />
            <input
              type="text"
              placeholder="Image URLs (comma separated)"
              value={hotelData.images}
              onChange={(e) =>
                setHotelData({ ...hotelData, images: e.target.value })
              }
              className="admin-input"
            />
            <button type="submit" className="admin-submit-btn">
              Publish Hotel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
