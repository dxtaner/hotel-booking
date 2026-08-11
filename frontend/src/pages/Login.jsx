import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", formData);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="auth-box">
      <h2 className="auth-title">Welcome back</h2>
      <p className="auth-subtitle">
        Enter your details to access your account.
      </p>
      {error && (
        <p style={{ color: "#ef4444", marginTop: "1rem", textAlign: "center" }}>
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          className="auth-input"
          placeholder="E-posta adresi"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          className="auth-input"
          placeholder="Şifre"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <button type="submit" className="auth-btn">
          Giriş Yap
        </button>
      </form>
      <p className="auth-footer">
        Don't have an account?{" "}
        <Link to="/register" className="auth-link">
          Sign Up{" "}
        </Link>
      </p>
    </div>
  );
};

export default Login;
