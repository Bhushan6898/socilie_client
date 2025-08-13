import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThreeDotsVertical } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import profilpicture from '../../asset/profile.png';
import { OrbitProgress } from 'react-loading-indicators';
import PostActions from './postaction';
import MenuModal from './dropdownmenu.js';

function Post() {
  const navigate = useNavigate();
  const postData = useSelector((state) => state.auth.allpostdata);
  const currentUserId = useSelector((state) => state.auth.id);

  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(null); // Track which post is playing

  useEffect(() => {
    if (postData) {
      setLoading(false);
    }
  }, [postData]);

  const handleProfileClick = (userid) => {
    navigate(`userinfo/${userid}`);
  };

  const handleToggleMusic = (idx) => {
    const audio = document.getElementById(`audio-${idx}`);
    if (!audio) return;

    if (audio.paused) {
      document.querySelectorAll('audio').forEach((a) => a.pause());
      audio.play();
      setPlayingIndex(idx);
    } else {
      audio.pause();
      setPlayingIndex(null);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <OrbitProgress color="#32cd32" size="medium" text="Loading..." textColor="" />
      </div>
    );
  }

  return (
    <div className="container">
      {postData.map((post, idx) => {
        const user = post.userId || {};
        const mediaItems = post.media || [];
        const hasMultipleMedia = mediaItems.length > 1;

        return (
          <div className="card mb-4" key={idx}>
            {/* Profile Section */}
            <div className="card-header d-flex align-items-center justify-content-between">
              <div
                className="d-flex align-items-center"
                onClick={() => handleProfileClick(user._id)}
                style={{ cursor: "pointer", marginLeft: "-15px" }}
              >
                <img
                  src={user.profilePicture || profilpicture}
                  alt={user.username}
                  className="rounded-circle border me-1"
                  style={{ width: 36, height: 36, objectFit: "cover" }}
                />
                <strong
                  style={{
                    fontSize: "13px",
                    maxWidth: window.innerWidth <= 576 ? "90px" : "150px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    display: "inline-block",
                    verticalAlign: "middle",
                  }}
                >
                  {user.username}
                </strong>
              </div>

              <div className="d-flex align-items-center gap-2">
                {currentUserId !== user._id && (
                  <button className="btn btn-outline-primary btn-sm">Follow</button>
                )}
                <button
                  className="btn p-0 border-0 bg-transparent"
                  style={{ lineHeight: 0 }}
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <ThreeDotsVertical size={18} />
                </button>
              </div>
              {showMenu && <MenuModal onClose={() => setShowMenu(false)} />}
            </div>

            {/* Media Section */}
            {mediaItems.length > 0 && (
              <div id={`carousel-${idx}`} className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {mediaItems.map((item, i) => (
                    <div
                      className={`carousel-item ${i === 0 ? 'active' : ''}`}
                      key={i}
                      style={{ position: "relative" }}
                    >
                      {item.type === 'video' ? (
                        <video className="d-block w-100" controls>
                          <source src={item.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img src={item.url} className="d-block w-100" alt={`media-${i}`} />
                      )}

                      {/* Music icon overlay */}
                      {post.music && (
                        <>
                          <audio id={`audio-${idx}`} src={post.music}></audio>
                          <button
                            className="btn btn-light btn-sm"
                            style={{
                              position: "absolute",
                              bottom: "10px",
                              right: "10px",
                              borderRadius: "100%",
                              padding: "2px",
                              fontSize: "14px",
                              backgroundColor: "rgba(255,255,255,0.8)"
                            }}
                            onClick={() => handleToggleMusic(idx)}
                          >
                            <i
                              className={
                                playingIndex === idx
                                  ? "bi bi-volume-up-fill"
                                  : "bi bi-volume-mute-fill"
                              }
                            ></i>
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {hasMultipleMedia && (
                  <>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target={`#carousel-${idx}`}
                      data-bs-slide="prev"
                    />
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target={`#carousel-${idx}`}
                      data-bs-slide="next"
                    />
                  </>
                )}
              </div>
            )}

            {/* Caption + Actions */}
            <div className="card-body">
              <p className="card-text">{post.caption}</p>
              <PostActions />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Post;
