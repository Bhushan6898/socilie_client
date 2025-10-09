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
      <nav
        className="navbar navbar-light bg-light border-bottom px-3 py-2"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%',
        }}
      >
        <div
          className="container-fluid d-flex justify-content-between align-items-center flex-wrap"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo Text */}
          <Link
            className="navbar-brand d-flex align-items-center"
            to="/"
            style={{ textDecoration: 'none' }}
          >
           <h5
  style={{
    fontFamily: "'Alex Brush', cursive",
    fontSize: '1.8rem',
    background: 'linear-gradient(45deg, #f58529, #dd2a7b, #8134af, #515bd4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0,
    letterSpacing: '1px',
    padding: 0,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadow: '0px 0px 1px rgba(0,0,0,0.2)', // adds subtle depth
  }}
>
  Socilite
</h5>

          </Link>

          {/* Right Side Icons */}
          <div
            className="d-flex align-items-center"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {/* 🌙 Toggle Theme Button */}
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setDarkMode(!darkMode)}
              title="Toggle Dark Mode"
              style={{
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {darkMode ? '🌞' : '🌙'}
            </button>

            {/* 🔔 Notifications */}
            <Link
              to="/notifications"
              className="btn btn-link position-relative"
              style={{
                position: 'relative',
                padding: '0',
              }}
            >
              <i className="fas fa-bell fa-lg" style={{ color: '#f34a12ff' }}></i>
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{
                  fontSize: '0.65rem',
                  transform: 'translate(-25%, -30%)',
                }}
              >
                {notifications?.length || 0}
              </span>
            </Link>

            {/* ✉️ Messages */}
            <Link
              to="/messages"
              className="btn btn-link"
              style={{ padding: '0' }}
            >
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
