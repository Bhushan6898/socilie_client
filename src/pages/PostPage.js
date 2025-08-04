import React, { useState } from 'react';

function PostPage() {
  const [caption, setCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Caption:", caption);
    console.log("File:", selectedFile);
    // Add upload logic here
  };

  return (
    <div className="container py-4">
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>

        {selectedFile && (
          <div className="mb-3">
            <p><strong>Selected File:</strong> {selectedFile.name}</p>
            {selectedFile.type.startsWith("image/") && (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="img-thumbnail"
                style={{ maxWidth: "200px" }}
              />
            )}
          </div>
        )}

        <button className="btn btn-primary" type="submit">Post</button>
      </form>
    </div>
  );
}

export default PostPage;
