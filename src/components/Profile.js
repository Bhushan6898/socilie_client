import React from 'react';

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
        <div className="col-3 d-flex justify-content-center">
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="Profile"
            className="rounded-circle border"
            width="120"
            height="120"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="col-9">
          <div className="d-flex align-items-center mb-2">
            <h2 className="me-3 mb-0">john_doe</h2>
            <button className="btn btn-outline-secondary btn-sm me-2">Edit Profile</button>
            <button className="btn btn-outline-secondary btn-sm">Settings</button>
          </div>
          <div className="d-flex mb-2">
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
          <div className="col-4" key={idx}>
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
