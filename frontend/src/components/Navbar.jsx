import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    toast.info("Logged out successfully.");
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar-wrapper">
      <nav className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <div className="logo-badge">🏨</div>
          <span className="logo-text">
            Hotel<span>Booking</span>
          </span>
        </Link>

        {/* Mobile Hamburger Toggle */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Nav Links */}
        <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <div className="nav-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
              onClick={closeMenu}
              end
            >
              Hotels
            </NavLink>
            <NavLink
              to="/experiences"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
              onClick={closeMenu}
            >
              Experiences
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
              onClick={closeMenu}
            >
              About
            </NavLink>
          </div>

          {/* Auth Actions */}
          <div className="nav-auth">
            {user ? (
              <div className="user-profile-group">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                  }
                  onClick={closeMenu}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/my-bookings"
                  className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                  }
                  onClick={closeMenu}
                >
                  My Bookings
                </NavLink>

                <div className="user-info-tag">
                  <div className="user-avatar">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="user-name">{user.name}</span>
                </div>

                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </div>
            ) : (
              <div className="guest-actions">
                <Link to="/login" className="btn-ghost" onClick={closeMenu}>
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                  onClick={closeMenu}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
