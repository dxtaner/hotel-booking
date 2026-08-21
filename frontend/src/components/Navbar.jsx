import { useContext, useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  return (
    <header className="navbar-header">
      <nav className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">✨</span>
          <span className="logo-text">
            Stay<span className="logo-accent">Finder</span>
          </span>
        </Link>

        <button
          className={`hamburger ${isOpen ? "is-active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <div className={`nav-menu ${isOpen ? "active" : ""}`}>
          <div className="nav-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={closeMenu}
            >
              Home
            </NavLink>

            <NavLink
              to="/experiences"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={closeMenu}
            >
              Experiences
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={closeMenu}
            >
              About Us
            </NavLink>

            {user && (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  onClick={closeMenu}
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/my-bookings"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  onClick={closeMenu}
                >
                  My Bookings
                </NavLink>
              </>
            )}

            {user && user.role === "admin" && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link admin-badge active"
                    : "nav-link admin-badge"
                }
                onClick={closeMenu}
              >
                Admin Panel
              </NavLink>
            )}
          </div>

          <div className="nav-actions">
            {user ? (
              <div className="user-profile">
                <div className="user-info">
                  <span className="user-name">{user.name}</span>
                </div>
                <button className="btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-nav-buttons">
                <Link to="/login" className="btn-login" onClick={closeMenu}>
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-register"
                  onClick={closeMenu}
                >
                  Sign Up
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
