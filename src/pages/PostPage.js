import React from 'react';

function PostPage() {
  return (
    <div className="container py-4">
      <h2>Create a Post</h2>
      <form>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Caption" />
        </div>
        <div className="mb-3">
          <input type="file" className="form-control" />
        </div>
        <button className="btn btn-primary">Post</button>
      </form>
    </div>
  );
}

export default PostPage;
