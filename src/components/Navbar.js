import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light border-bottom">
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" width="32" height="32" />
          <span className="ms-2 fw-bold fs-5">Instagram</span>
        </Link>
        <form className="d-none d-md-flex mx-auto" style={{ maxWidth: 300 }}>
          <input className="form-control" type="search" placeholder="Search" />
        </form>
        <div className="d-flex align-items-center">
          <Link to="/login" className="btn btn-outline-primary ms-2">Login</Link>
          <Link to="/register" className="btn btn-outline-secondary ms-2">Register</Link>
          <Link to="/profile" className="d-flex align-items-center ms-3 text-decoration-none">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="Profile"
              className="rounded-circle border"
              width="36"
              height="36"
              style={{ objectFit: 'cover' }}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
