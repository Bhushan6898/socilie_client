import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../asset/logo.png";
import { useUser } from "../hook/user/useUser";
import { Commet } from "react-loading-indicators";

function Login() {
  const { getlogin, getconnect } = useUser();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await getconnect();
        if (response?.status === 200) {
          setIsConnected(true);
        }
      } catch (error) {
        console.error("Connection failed:", error);
      }
    };
    checkConnection();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await getlogin(form);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-white text-center p-3">
        <Commet color="#32cd32" size="medium" />
        <h6 className="mt-3">Logging into Socilite...</h6>
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
        {/* Logo & title */}
        <div className="text-center mb-4">
          <img
            src={logo}
            alt="Socilite"
            className="img-fluid"
            style={{ width: "60px", borderRadius: "12px" }}
          />
          <h3 className="mt-3 fw-bold">Socilite</h3>
          <p className="text-muted small">Connect & share with the world 🌍</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3 rounded-pill p-2"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3 rounded-pill p-2"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
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
            Log In
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
          <span>Don’t have an account? </span>
          <Link to="/register" className="fw-bold text-decoration-none">
            Sign up
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;
