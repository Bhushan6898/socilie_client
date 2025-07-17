import React from 'react';

function Post({ username, image, caption, type = 'image', videoUrl, profileImg }) {
  return (
    <div className="card mb-4">
      <div className="card-header d-flex align-items-center">
        <img
          src={profileImg || "https://randomuser.me/api/portraits/men/1.jpg"}
          alt={username}
          className="rounded-circle border me-2"
          style={{ width: 36, height: 36, objectFit: 'cover' }}
        />
        <strong>{username}</strong>
        {/* Reel/Video indicator */}
        {type === 'reel' && (
          <span className="ms-auto text-danger">
            <i className="fas fa-film"></i> Reel
          </span>
        )}
        {type === 'video' && (
          <span className="ms-auto text-primary">
            <i className="fas fa-video"></i> Video
          </span>
        )}
      </div>
      {/* Media */}
      {type === 'image' && (
        <img src={image} className="card-img-top" alt="post" />
      )}
      {(type === 'video' || type === 'reel') && (
        <video className="card-img-top" controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
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
         
        {/* ...existing code for Like/Comment buttons if needed... */}
      </div>
      
    </div>
   
  );
}

export default Post;
