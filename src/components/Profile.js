import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hook/user/useUser';
import profilpicture from '../asset/profile.png';

const posts = [
  "https://picsum.photos/id/1011/300/300",
  "https://picsum.photos/id/1012/300/300",
  "https://picsum.photos/id/1013/300/300",
  "https://picsum.photos/id/1015/300/300",
  "https://picsum.photos/id/1016/300/300",
  "https://picsum.photos/id/1018/300/300"
];

const dummyUsers = [
  { name: "Alice", username: "alice_01" },
  { name: "Bob", username: "bob_travel" },
  { name: "Charlie", username: "charlie.dev" }
];

function Profile() {
  const [showSettings, setShowSettings] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [newProfilePic, setNewProfilePic] = useState(null);

  const navigate = useNavigate();
  const { logout, getuser, userdatas, updatedata } = useUser();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    getuser();
  }, []);

  const [userData, setUserData] = useState({
    name: "",
    username: '',
    bio: '',
    followers: 0,
    following: 0,
    post: 0,
    profilepic: "",
    email: "",
    number: ""
  });

  useEffect(() => {
    if (userdatas) {
      setUserData({
        name: userdatas.name || "",
        username: userdatas.username || 'bhushan_19',
        bio: userdatas.bio || 'Photographer & Traveler 🌍',
        followers: userdatas.followersCount || 0,
        following: userdatas.followingCount || 0,
        post: userdatas.postsCount || 0,
        profilepic: userdatas.profilePicture || profilpicture,
        email: userdatas.email || "",
        number: userdatas.number || ""
      });
    }
  }, [userdatas]);

  useEffect(() => {
    return () => {
      if (newProfilePic) {
        URL.revokeObjectURL(newProfilePic);
      }
    };
  }, [newProfilePic]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('username', userData.username);
    formData.append('email', userData.email);
    formData.append('bio', userData.bio);
    formData.append('number', userData.number);
    if (newProfilePic) {
      formData.append('profileImage', newProfilePic);
    }

    await updatedata(formData);

    if (newProfilePic) {
      setUserData(prev => ({
        ...prev,
        profilepic: URL.createObjectURL(newProfilePic)
      }));
    }

    closeModals();
    getuser(); // refresh data
  };

  const openListModal = (type) => {
    setModalType(type);
  };

  const closeModals = () => {
    setShowSettings(false);
    setShowEdit(false);
    setSelectedPost(null);
    setModalType(null);
    setNewProfilePic(null);
  };

  return (
    <div className="container py-4">
      {/* Top Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">{userData.username}</h4>
        <div>
          <button className="btn btn-link p-0 me-3" title="Edit Profile" onClick={() => setShowEdit(true)}>
            <i className="fas fa-user-edit fa-lg" style={{ color: '#3498db' }}></i>
          </button>
          <button className="btn btn-link p-0" title="Settings" onClick={() => setShowSettings(true)}>
            <i className="fas fa-cog fa-lg" style={{ color: '#888' }}></i>
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="row mb-4 align-items-start">
        <div className="col-12 col-sm-3 text-center">
          <img
            src={userData.profilepic}
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
              <strong>{userData.post}</strong>
              <div className="text-muted small">Posts</div>
            </div>
            <div style={{ cursor: 'pointer' }} onClick={() => openListModal('followers')}>
              <strong>{userData.followers}</strong>
              <div className="text-muted small">Followers</div>
            </div>
            <div style={{ cursor: 'pointer' }} onClick={() => openListModal('following')}>
              <strong>{userData.following}</strong>
              <div className="text-muted small">Following</div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* Posts Grid */}
      <div className="row g-2">
        {posts.map((url, idx) => (
          <div className="col-6 col-md-4" key={idx} onClick={() => setSelectedPost(url)} style={{ cursor: 'pointer' }}>
            <div className="ratio ratio-1x1 bg-light rounded overflow-hidden">
              <img src={url} alt="Post" className="w-100 h-100" style={{ objectFit: 'cover' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <Modal title="Settings" onClose={closeModals}>
          <button className="btn btn-outline-secondary w-100 mb-2" onClick={() => navigate('/profile')}>Account Settings</button>
          <button className="btn btn-outline-primary w-100 mb-2" onClick={() => navigate('/login')}>Login</button>
          <button className="btn btn-outline-success w-100" onClick={() => navigate('/register')}>Register</button>
          <button className="btn btn-outline-danger w-100" onClick={handleLogout}>Logout</button>
        </Modal>
      )}

      {/* Edit Modal */}
      {showEdit && (
        <Modal title="Edit Profile" onClose={closeModals}>
          <div className="mb-3 text-center">
            <img
              src={newProfilePic ? URL.createObjectURL(newProfilePic) : userData.profilepic}
              alt="Preview"
              className="rounded-circle border"
              style={{ width: 100, height: 100, objectFit: 'cover' }}
            />
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(e) => setNewProfilePic(e.target.files[0])}
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name="name" value={userData.name} onChange={handleChange} />
          </div>
          <div className="mb-2">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" name="username" value={userData.username} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Bio</label>
            <textarea className="form-control" name="bio" rows="2" value={userData.bio} onChange={handleChange}></textarea>
          </div>
          <div className="mb-2">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={userData.email} onChange={handleChange}
              required pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" title="Please enter a valid email address" />
          </div>
          <div className="mb-2">
            <label className="form-label">Mobile Number</label>
            <input type="text" className="form-control" name="number" value={userData.number} onChange={handleChange} />
          </div>
          <button className="btn btn-primary w-100 mb-2" onClick={handleSaveChanges}>Save Changes</button>
        </Modal>
      )}

      {/* Post Viewer Modal */}
      {selectedPost && (
        <Modal title="Post" onClose={closeModals}>
          <img src={selectedPost} alt="Full Post" className="w-100 rounded" style={{ maxHeight: '70vh', objectFit: 'contain' }} />
        </Modal>
      )}

      {/* Followers / Following Modal */}
      {modalType && (
        <Modal title={modalType === 'followers' ? 'Followers' : 'Following'} onClose={closeModals}>
          {dummyUsers.map((user, idx) => (
            <div key={idx} className="d-flex justify-content-between align-items-center border-bottom py-2">
              <div>
                <strong>{user.name}</strong>
                <div className="text-muted small">@{user.username}</div>
              </div>
              <button className="btn btn-sm btn-outline-primary">View</button>
            </div>
          ))}
        </Modal>
      )}
    </div>
  );
}

// Reusable Modal Component
function Modal({ title, children, onClose }) {
  return (
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
      onClick={onClose}
    >
      <div
        className="d-flex flex-column align-items-center justify-content-center h-100"
        style={{ pointerEvents: 'none' }}
      >
        <div
          className="bg-white rounded p-4"
          style={{ width: '90%', maxWidth: 400, pointerEvents: 'auto' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">{title}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Profile;
