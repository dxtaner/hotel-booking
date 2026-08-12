import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", formData);
      toast.success("Account created successfully! Please sign in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="register-box">
      <h2 className="register-title">Create Account</h2>
      <p className="register-subtitle">
        Sign up now to start booking your stays
      </p>
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
          placeholder="Email address"
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
          Sign Up
        </button>
      </form>
      <p className="register-footer">
        Already have an account?{" "}
        <Link to="/login" className="register-link">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default Register;
