import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await API.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "The registration process failed.",
      );
    }
  };

  return (
    <div className="register-box">
      <h2 className="register-title">Create Account</h2>
      <p className="register-subtitle">
        Sign up now and start making reservations.
      </p>
      {error && (
        <p style={{ color: "#ef4444", marginTop: "1rem", textAlign: "center" }}>
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          className="register-input"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          className="register-input"
          placeholder="E-mail address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          className="register-input"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <button type="submit" className="register-btn">
          Sign Up{" "}
        </button>
      </form>
      <p className="register-footer">
        Do you already have an account?
        <Link to="/login" className="register-link">
          Log In{" "}
        </Link>
      </p>
    </div>
  );
};

export default Register;
