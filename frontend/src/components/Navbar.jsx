import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-logo">
        🏨 HotelBooking
      </Link>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          Hotels
        </Link>
        {user ? (
          <>
            <Link to="/my-bookings" className="navbar-link">
              My Bookings
            </Link>
            <span className="navbar-user-text">
              Welcome, <strong>{user.name}</strong>
            </span>
            <button onClick={handleLogout} className="navbar-btn-danger">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">
              Sign In
            </Link>
            <Link to="/register" className="navbar-btn-primary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
