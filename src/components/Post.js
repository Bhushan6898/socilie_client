import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../hook/admin/useAdmin';

function Post() {
  const navigate = useNavigate();
  const { getallpost, postdatas } = useAdmin();

  useEffect(() => {
    getallpost();
  }, []);

  const handleProfileClick = (username) => {
    navigate(`/user/${username}`);
  };

  return (
    <div className="container">
      {postdatas?.map((post, idx) => {
        const user = post.userId || {};
        const mediaItems = post.media || [];
        const hasMultipleMedia = mediaItems.length > 1;

        return (
          <div className="card mb-4" key={idx}>
            {/* Profile Section */}
            <div className="card-header d-flex align-items-center justify-content-between">
              <div
                className="d-flex align-items-center"
                onClick={() => handleProfileClick(user.username)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={user.profilePicture || 'https://randomuser.me/api/portraits/men/1.jpg'}
                  alt={user.username}
                  className="rounded-circle border me-2"
                  style={{ width: 36, height: 36, objectFit: 'cover' }}
                />
                <strong>{user.username}</strong>
              </div>

              <button className="btn btn-outline-primary btn-sm">Follow</button>
            </div>

            {/* Media Section */}
            {mediaItems.length > 0 && (
              <div id={`carousel-${idx}`} className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {mediaItems.map((item, i) => (
                    <div
                      className={`carousel-item ${i === 0 ? 'active' : ''}`}
                      key={i}
                    >
                      {item.type === 'video' ? (
                        <video className="d-block w-100" controls>
                          <source src={item.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img src={item.url} className="d-block w-100" alt={`media-${i}`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Show controls only if multiple media */}
                {hasMultipleMedia && (
                  <>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target={`#carousel-${idx}`}
                      data-bs-slide="prev"
                    >
                      <span className="carousel-control-prev-icon" />
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target={`#carousel-${idx}`}
                      data-bs-slide="next"
                    >
                      <span className="carousel-control-next-icon" />
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Caption + Music + Buttons */}
            <div className="card-body">
              <p className="card-text">{post.caption}</p>

              {/* Music Player Icon (bottom right) */}
              {post.music && (
                <div className="d-flex justify-content-end align-items-center mb-2">
                  <audio id={`audio-${idx}`} src={post.music}></audio>
                  <button
                    className="btn btn-sm btn-light"
                    onClick={() => {
                      const audio = document.getElementById(`audio-${idx}`);
                      if (audio.paused) {
                        document.querySelectorAll('audio').forEach((a) => a.pause());
                        audio.play();
                      } else {
                        audio.pause();
                      }
                    }}
                  >
                    <i className="fas fa-volume-up"></i>
                  </button>
                </div>
              )}

              <div className="d-flex">
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
      })}
    </div>
  );
}

export default Post;
