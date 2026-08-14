import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeBookings: 0,
    cancelledBookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await API.get("/bookings/my-bookings");
        const bookings = res.data.bookings || [];

        const active = bookings.filter((b) => b.status === "confirmed").length;
        const cancelled = bookings.filter(
          (b) => b.status === "cancelled",
        ).length;

        setStats({
          totalBookings: bookings.length,
          activeBookings: active,
          cancelledBookings: cancelled,
        });
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="dashboard-container" style={{ textAlign: "center" }}>
        <h2>Please sign in to access your dashboard.</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>User Dashboard</h1>
        <p>
          Welcome back, <strong>{user.name}</strong> ({user.email})
        </p>
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading stats...</p>
      ) : (
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Total Bookings</h3>
            <p className="dashboard-number">{stats.totalBookings}</p>
          </div>
          <div className="dashboard-card">
            <h3>Active Bookings</h3>
            <p className="dashboard-number text-success">
              {stats.activeBookings}
            </p>
          </div>
          <div className="dashboard-card">
            <h3>Cancelled Bookings</h3>
            <p className="dashboard-number text-danger">
              {stats.cancelledBookings}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
