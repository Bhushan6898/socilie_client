import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: 'Bhushan Patil',
    username: 'bhushan_19',
    bio: 'Photographer & Traveler 🌍'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container py-4">
      {/* Top Username + Icons */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">{userData.username}</h4>
        <div>
          <button className="btn btn-link p-0 me-3" title="Edit Profile" onClick={() => setShowEdit(true)}>
            <i className="fas fa-user-edit fa-lg" style={{ color: '#3498db' }}></i>
          </button>
          <button
            className="btn btn-link p-0"
            title="Settings"
            onClick={() => setShowSettings(true)}
            style={{ border: 'none', background: 'none' }}
          >
            <i className="fas fa-cog fa-lg" style={{ color: '#888' }}></i>
          </button>
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="row mb-4 align-items-start">
        <div className="col-12 col-sm-3 text-center">
          <img
            src="https://res.cloudinary.com/dl35wuxhn/image/upload/v1751899961/user-images/user_dc30631497e734f9d197e4d81572e6e8e57c58669ddd23b7487f5cd5b310e3d5.jpg"
            alt="Profile"
            className="rounded-circle border mb-2"
            style={{ width: 100, height: 100, objectFit: 'cover' }}
          />
          <h5 className="mb-0">{userData.name}</h5>
          <div className="text-muted small">{userData.bio}</div>
        </div>
        <div className="col-12 col-sm-9 mt-3 mt-sm-0">
          <div className="d-flex justify-content-around text-center">
            <div>
              <strong>50</strong>
              <div className="text-muted small">Posts</div>
            </div>
            <div>
              <strong>850</strong>
              <div className="text-muted small">Followers</div>
            </div>
            <div>
              <strong>1600</strong>
              <div className="text-muted small">Following</div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* Posts Grid */}
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

      {/* Edit Modal */}
      {showEdit && (
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
          onClick={() => setShowEdit(false)}
        >
          <div
            className="d-flex flex-column align-items-center justify-content-center h-100"
            style={{ pointerEvents: 'none' }}
          >
            <div
              className="bg-white rounded p-4"
              style={{ minWidth: 300, pointerEvents: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              <h5 className="mb-3">Edit Profile</h5>
              <div className="mb-2">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Bio</label>
                <textarea
                  className="form-control"
                  name="bio"
                  rows="2"
                  value={userData.bio}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button className="btn btn-primary w-100 mb-2" onClick={() => setShowEdit(false)}>
                Save Changes
              </button>
              <button className="btn btn-link w-100" onClick={() => setShowEdit(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
