import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../asset/logo.png'; // Assuming you have a logo image
import { useSelector } from 'react-redux';
import { useUser } from '../hook/user/useUser';
import profilpicture from '../asset/profile.png';
function Navbar() {

  const user = useSelector((state) => state.auth.userdata);
  const notifications = useSelector((state) => state.auth.notificationdata);
  const { getnotification,getpost } = useUser();




  useEffect(() => {
    getnotification();
    getpost();
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <nav className="navbar navbar-light bg-light border-bottom">
        <div className="container d-flex justify-content-between align-items-center">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={logo}
              alt="Socilite"
              className="img-fluid"
              style={{ maxWidth: 70, height: 'auto', borderRadius: '10%' }}
            />
          </Link>

          <div className="d-flex align-items-center">
            <Link to="/notifications" className="btn btn-link me-2">
              <div className="position-relative">
                <i className="fas fa-bell fa-lg" style={{ color: '#f34a12ff' }}></i>

                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: '0.65rem' }}
                >
                  {notifications && notifications.length > 0 ? notifications.length : 0}
                </span>
              </div>
            </Link>
            <Link to="/messages" className="btn btn-link me-2">
              <i className="fas fa-envelope fa-lg" style={{ color: '#3498db' }}></i>
            </Link>
          </div>
        </div>
      </nav>


      <nav
        className="navbar bg-white border-top fixed-bottom"
        style={{ minHeight: 30, zIndex: 1000 }}
      >
        <div className="container d-flex justify-content-between align-items-center px-0" style={{ maxWidth: 500 }}>
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
              src={user.profilePicture ||profilpicture}
              alt="Profile"
              className="rounded-circle border"
              style={{ width: 28, height: 28, objectFit: 'cover', borderColor: '#f39c12' }}
            />
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
