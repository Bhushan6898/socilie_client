import React from 'react';
import { Link } from 'react-router-dom';

const posts = [
  "https://picsum.photos/id/1011/300/300",
  "https://picsum.photos/id/1012/300/300",
  "https://picsum.photos/id/1013/300/300",
  "https://picsum.photos/id/1015/300/300",
  "https://picsum.photos/id/1016/300/300",
  "https://picsum.photos/id/1018/300/300"
];

function Profile() {
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
            <Link to="/settings" className="btn btn-link p-0" title="Settings">
              <i className="fas fa-cog fa-lg" style={{ color: '#888' }}></i>
            </Link>
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
    </div>
  );
}

export default Profile;
