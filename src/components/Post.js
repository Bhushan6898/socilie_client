import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { ThreeDotsVertical } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import profilpicture from '../asset/profile.png';
import { OrbitProgress } from 'react-loading-indicators';

function Post() {
  const navigate = useNavigate();
  const postData = useSelector((state) => state.auth.allpostdata);
  const currentUserId = useSelector((state) => state.auth.id);

  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    if (postData) {
      setLoading(false);
    }
  }, []);

  const handleProfileClick = (userid) => {
    navigate(`userinfo/${userid}`);
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
      {postData.map((post,idx) => {
        const user = post.userId || {};
        const mediaItems = post.media || [];
        const hasMultipleMedia = mediaItems.length > 1;

        return (
          <div className="card mb-4" key={idx}>
            {/* Profile Section */}
           <div className="card-header d-flex align-items-center justify-content-between">
      {/* Profile Section */}
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

      {/* Follow + Three Dots */}
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-outline-primary btn-sm">Follow</button>

        {/* Three Dots Button */}
        <button
          className="btn p-0 border-0 bg-transparent"
          style={{ lineHeight: 0 }}
          onClick={() => setShowMenu(!showMenu)}
        >
          <ThreeDotsVertical size={18} />
        </button>
      </div>

      {/* Instagram Style Menu */}
      {showMenu && (
        <div
          style={{
            position: "fixed",
            bottom: "50%", // middle-ish
            left: "50%",
            transform: "translate(-50%, 50%)",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            minWidth: "200px",
            zIndex: 1050,
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "10px",
              borderBottom: "1px solid #ddd",
              cursor: "pointer",
              fontWeight: "bold",
              color: "red",
            }}
            onClick={() => alert("Report")}
          >
            Report
          </div>
          <div
            style={{
              padding: "10px",
              borderBottom: "1px solid #ddd",
              cursor: "pointer",
            }}
            onClick={() => alert("Unfollow")}
          >
            Unfollow
          </div>
          <div
            style={{ padding: "10px", cursor: "pointer" }}
            onClick={() => setShowMenu(false)}
          >
            Cancel
          </div>
        </div>
      )}
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
