import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../hook/user/useUser";
import logo from "../asset/logo.png";
import { OrbitProgress } from "react-loading-indicators";

function Register() {
  const { getregister } = useUser();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    number: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await getregister(form);
    if (response?.status === 200) {
      setForm({ name: "", username: "", email: "", number: "", password: "" });
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white text-center p-3">
        <OrbitProgress color="#32cd32" size="medium" text="Registering..." />
        <h6 className="mt-3">Creating your Socilite account...</h6>
      </div>
    );
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center px-3"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eab566f5 0%, #764ba2 100%)",
      }}
    >
      <div
        className="card p-4 shadow-lg w-100"
        style={{
          maxWidth: "400px",
          borderRadius: "20px",
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.95)",
        }}
      >
        {/* Logo & Title */}
        <div className="text-center mb-4">
          <img
            src={logo}
            alt="Socilite"
            className="img-fluid"
            style={{ width: "60px", borderRadius: "12px" }}
          />
          <h3 className="mt-3 fw-bold">Create Account</h3>
          <p className="text-muted small">Join Socilite and connect with the world 🌍</p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="form-control mb-3 rounded-pill p-2"
            required
          />
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="form-control mb-3 rounded-pill p-2"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="form-control mb-3 rounded-pill p-2"
            required
          />
          <input
            type="text"
            name="number"
            value={form.number}
            onChange={handleChange}
            placeholder="Phone Number"
            className="form-control mb-3 rounded-pill p-2"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="form-control mb-4 rounded-pill p-2"
            required
          />
          <button
            type="submit"
            className="btn w-100 py-2 rounded-pill fw-bold"
            style={{
              background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              color: "#fff",
            }}
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1" />
          <span className="px-2 text-muted">or</span>
          <hr className="flex-grow-1" />
        </div>

        {/* Footer */}
        <div className="text-center">
          <span>Already have an account? </span>
          <Link to="/login" className="fw-bold text-decoration-none">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
