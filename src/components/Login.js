import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../asset/logo.png';
import { useUser } from '../hook/user/useUser';
import { OrbitProgress } from 'react-loading-indicators';
function Login() {
  const { getlogin } = useUser();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
     setLoading(true);
    e.preventDefault();
    await getlogin(form);
     setLoading(false);
  };

   if (loading) {
       return (
         <div className="d-flex justify-content-center align-items-center vh-100">
           <OrbitProgress color="#32cd32" size="medium" text="Loading..." textColor="" />
         </div>
       );
     }

  return (
    <div className="d-flex justify-content-center align-items-center bg-light" style={{ minHeight: '80vh' }}>
      <div className="card p-4" style={{ maxWidth: 350, width: '100%' }}>
        <div className="text-center mb-4">
          <img src={logo} alt="Instagram" width="48" style={{ borderRadius: "10px" }} />
          <h4 className="mt-2 mb-0 fw-bold">SOCILITE</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-2"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-primary w-100 mb-2">Log In</button>
        </form>
        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
