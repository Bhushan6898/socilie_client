import React from 'react';

function Post({ username, image, caption }) {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <strong>{username}</strong>
      </div>
      <img src={image} className="card-img-top" alt="post" />
      <div className="card-body">
        <p className="card-text">{caption}</p>
        <button className="btn btn-outline-primary btn-sm me-2">Like</button>
        <button className="btn btn-outline-secondary btn-sm">Comment</button>
      </div>
    </div>
  );
}

export default Post;
