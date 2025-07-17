import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const posts = [
  "https://picsum.photos/id/1011/300/300",
  "https://picsum.photos/id/1012/300/300",
  "https://picsum.photos/id/1013/300/300",
  "https://picsum.photos/id/1015/300/300",
  "https://picsum.photos/id/1016/300/300",
  "https://picsum.photos/id/1018/300/300"
];

function Profile() {
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      <div className="row align-items-center mb-4">
        <div className="col-4 col-sm-3 d-flex justify-content-center">
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="Profile"
            className="rounded-circle border"
            style={{ width: 100, height: 100, objectFit: 'cover' }}
          />
        </div>
        <div className="col-8 col-sm-9">
          <div className="d-flex align-items-center mb-2 flex-wrap">
            <h2 className="me-3 mb-0 fs-4">john_doe</h2>
            <Link to="/edit-profile" className="btn btn-link p-0 me-2" title="Edit Profile">
              <i className="fas fa-user-edit fa-lg" style={{ color: '#3498db' }}></i>
            </Link>
            <button
              className="btn btn-link p-0"
              title="Settings"
              onClick={() => setShowSettings(true)}
              style={{ border: 'none', background: 'none' }}
            >
              <i className="fas fa-cog fa-lg" style={{ color: '#888' }}></i>
            </button>
          </div>
          <div className="d-flex mb-2 flex-wrap">
            <span className="me-4"><strong>6</strong> posts</span>
            <span className="me-4"><strong>120</strong> followers</span>
            <span><strong>180</strong> following</span>
          </div>
          <div>
            <strong>John Doe</strong>
            <div className="text-muted">Photographer & Traveler 🌍</div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row g-2">
        {posts.map((url, idx) => (
          <div className="col-6 col-md-4" key={idx}>
            <div className="ratio ratio-1x1 bg-light rounded overflow-hidden">
              <img src={url} alt="Post" className="w-100 h-100" style={{ objectFit: 'cover' }} />
            </div>
          </div>
        ))}
      </div>
      {/* Settings Modal */}
      {showSettings && (
        <div
          className="modal fade show"
          style={{
            display: 'block',
            background: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 2000
          }}
          tabIndex="-1"
          onClick={() => setShowSettings(false)}
        >
          <div
            className="d-flex flex-column align-items-center justify-content-center h-100"
            style={{ pointerEvents: 'none' }}
          >
            <div
              className="bg-white rounded p-4"
              style={{ minWidth: 250, pointerEvents: 'auto' }}
              onClick={e => e.stopPropagation()}
            >
              <h5 className="mb-3">Settings</h5>
              <button className="btn btn-outline-secondary w-100 mb-2" onClick={() => { setShowSettings(false); navigate('/profile'); }}>
                Account Settings
              </button>
              <button className="btn btn-outline-primary w-100 mb-2" onClick={() => { setShowSettings(false); navigate('/login'); }}>
                Login
              </button>
              <button className="btn btn-outline-success w-100" onClick={() => { setShowSettings(false); navigate('/register'); }}>
                Register
              </button>
              <button className="btn btn-link w-100 mt-3" onClick={() => setShowSettings(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
