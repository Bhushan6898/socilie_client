import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../asset/logo.png';
import { useSelector } from 'react-redux';
import { useUser } from '../hook/user/useUser';
import profilpicture from '../asset/profile.png';
import { useAdmin } from '../hook/admin/useAdmin';

function Navbar() {
  const user = useSelector((state) => state.auth.userdata);
  const notifications = useSelector((state) => state.auth.notificationdata);
  const { getnotification, getpost, getuser } = useUser();
  const { getallpost } = useAdmin();

  // 🌙 Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Apply theme on mount + when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    getnotification();
    getpost();
    getallpost();
    getuser();
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <nav className="navbar navbar-light bg-light border-bottom px-3 py-2">
        <div className="container d-flex justify-content-between align-items-center">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={logo}
              alt="Socilite"
              className="img-fluid"
              style={{ maxWidth: 70, height: 'auto', borderRadius: '10%' }}
            />
          </Link>

          <div className="d-flex align-items-center gap-3">
            {/* 🌙 Toggle Theme Button */}
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setDarkMode(!darkMode)}
              title="Toggle Dark Mode"
            >
              {darkMode ? '🌞' : '🌙'}
            </button>

            <Link to="/notifications" className="btn btn-link position-relative">
              <i className="fas fa-bell fa-lg" style={{ color: '#f34a12ff' }}></i>
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: '0.65rem' }}
              >
                {notifications?.length || 0}
              </span>
            </Link>

            <Link to="/messages" className="btn btn-link">
              <i className="fas fa-envelope fa-lg" style={{ color: '#3498db' }}></i>
            </Link>
          </div>
        </div>
      </nav>

      {/* Bottom Navbar */}
      <nav
        className="navbar bg-white border-top fixed-bottom"
        style={{ minHeight: 30, zIndex: 1000 }}
      >
        <div
          className="container d-flex justify-content-between align-items-center px-0"
          style={{ maxWidth: 500 }}
        >
          <Link to="/" className="nav-link text-center flex-fill py-2">
            <i className="fas fa-home fa-xl" style={{ color: '#e1306c' }}></i>
          </Link>
          <Link to="/searchbar" className="nav-link text-center flex-fill py-2">
            <i className="fas fa-search fa-xl" style={{ color: '#8e44ad' }}></i>
          </Link>
          <Link to="/post" className="nav-link text-center flex-fill py-2">
            <i className="far fa-square-plus fa-xl" style={{ color: '#27ae60' }}></i>
          </Link>
          <Link to="/video" className="nav-link text-center flex-fill py-2">
            <i className="fas fa-video fa-xl" style={{ color: '#e74c3c' }}></i>
          </Link>
          <Link to="/profile" className="nav-link text-center flex-fill py-2">
            <img
              src={user?.profilePicture || profilpicture}
              alt="Profile"
              className="rounded-circle border"
              style={{
                width: 28,
                height: 28,
                objectFit: 'cover',
                borderColor: '#f39c12',
              }}
            />
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
