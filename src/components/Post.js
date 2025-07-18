import React from 'react';
import { useNavigate } from 'react-router-dom';

function Post({ username, image, caption, type = 'image', videoUrl, profileImg }) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/user/${username}`);
  };

  return (
    <div className="card mb-4">
      {/* Profile Section */}
      <div className="card-header d-flex align-items-center justify-content-between">
        <div
          className="d-flex align-items-center"
          onClick={handleProfileClick}
          style={{ cursor: 'pointer' }}
        >
          <img
            src={profileImg || "https://randomuser.me/api/portraits/men/1.jpg"}
            alt={username}
            className="rounded-circle border me-2"
            style={{ width: 36, height: 36, objectFit: 'cover' }}
          />
          <strong>{username}</strong>
        </div>

        <button className="btn btn-outline-primary btn-sm">Follow</button>
      </div>

      {/* Media Section */}
      {type === 'image' && (
        <img src={image} className="card-img-top" alt="post" />
      )}
      {(type === 'video' || type === 'reel') && (
        <video className="card-img-top" controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Caption and Actions */}
      <div className="card-body">
        <p className="card-text">{caption}</p>
        <div className="d-flex mb-2">
          <button className="btn btn-link text-danger me-3">
            <i className="fas fa-heart"></i>
          </button>
          <button className="btn btn-link text-primary me-3">
            <i className="fas fa-comment"></i>
          </button>
          <button className="btn btn-link text-success">
            <i className="fas fa-share"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
