import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hook/user/useUser';
import profilpicture from '../asset/profile.png';
import { useSelector } from 'react-redux';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import Setting from './setting/index.js'

// Dummy post images
const dummyPosts = [
  "https://picsum.photos/id/1011/300/300",
  "https://picsum.photos/id/1012/300/300",
  "https://picsum.photos/id/1013/300/300",
  "https://picsum.photos/id/1015/300/300",
  "https://picsum.photos/id/1016/300/300",
  "https://picsum.photos/id/1018/300/300"
];

// Dummy followers/following
const dummyUsers = [
  { name: "Alice", username: "alice_01" },
  { name: "Bob", username: "bob_travel" },
  { name: "Charlie", username: "charlie.dev" }
];

function Profile() {
  const [showSettings, setShowSettings] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const audioRefs = useRef({});
  const [playingIndex, setPlayingIndex] = useState(null);
  const [play, setPlay] = useState([]);
  const navigate = useNavigate();
  const { logout, updatedata } = useUser();

  const user = useSelector((state) => state.auth.userdata);
  const postData = useSelector((state) => state.auth.postdata); // actual posts from Redux

  const [userData, setUserData] = useState({
    name: "",
    username: '',
    bio: '',
    followers: 0,
    following: 0,
    post: 0,
    profilepic: "",
    email: "",
    number: ""
  });

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || "",
        username: user.username || 'username',
        bio: user.bio || 'Photographer & Traveler 🌍',
        followers: user.followersCount || 0,
        following: user.followingCount || 0,
        post: user.postsCount || 0,
        profilepic: user.profilePicture || profilpicture,
        email: user.email || "",
        number: user.number || ""
      });
    }
  }, [user]);

  useEffect(() => {
    return () => {
      if (newProfilePic) {
        URL.revokeObjectURL(newProfilePic);
      }
    };
  }, [newProfilePic]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('username', userData.username);
    formData.append('email', userData.email);
    formData.append('bio', userData.bio);
    formData.append('number', userData.number);
    if (newProfilePic) {
      formData.append('profileImage', newProfilePic);
    }

    await updatedata(formData);

    if (newProfilePic) {
      setUserData(prev => ({
        ...prev,
        profilepic: URL.createObjectURL(newProfilePic)
      }));
    }

    closeModals();
  };

  const openListModal = (type) => {
    setModalType(type);
  };

  const closeModals = () => {
    setShowSettings(false);
    setShowEdit(false);
    setSelectedPost(null);
    setModalType(null);
    setNewProfilePic(null);
  };

  const allPosts = (postData && postData.length > 0) ? postData : dummyPosts;
  console.log("play", play);



  const toggleAudio = (index) => {
    const audio = audioRefs.current[index];


    if (!audio) return;

    // Pause currently playing audio
    Object.entries(audioRefs.current).forEach(([key, ref]) => {
      if (ref && parseInt(key) !== index) {
        ref.pause();
        ref.currentTime = 0;
      }
    });

    // Play or Pause clicked audio
    if (playingIndex === index) {
      audio.pause();
      setPlayingIndex(null);
    } else {
      audio.play();
      setPlayingIndex(index);
    }
  };
  return (
    <div className="container py-4" style={{ paddingBottom: 70 }}>
      {/* Top Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">{userData.username}</h4>
        <div>
          <button className="btn btn-link p-0 me-3" onClick={() => setShowEdit(true)}>
            <i className="fas fa-user-edit fa-lg" style={{ color: '#3498db' }}></i>
          </button>
          <button className="btn btn-link p-0" onClick={() => navigate('/setting')}>
            <i className="fas fa-cog fa-lg" style={{ color: '#888' }}></i>
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="row mb-4 align-items-start">
        <div className="col-12 col-sm-3 text-center">
          <img
            src={userData.profilepic}
            alt="Profile"
            className="rounded-circle border mb-2"
            style={{ width: 100, height: 100, objectFit: "cover", cursor: "pointer" }}
            onClick={() => setShowModal(true)}
          />
          <h5>{userData.name}</h5>
          <p className="text-muted small">{userData.bio}</p>
        </div>
        <div className="col-12 col-sm-9 mt-3 mt-sm-0">
          <div className="d-flex justify-content-around text-center">
            <div>
              <strong>{userData.post}</strong>
              <div className="text-muted small">Posts</div>
            </div>
            <div style={{ cursor: 'pointer' }} onClick={() => openListModal('followers')}>
              <strong>{userData.followers}</strong>
              <div className="text-muted small">Followers</div>
            </div>
            <div style={{ cursor: 'pointer' }} onClick={() => openListModal('following')}>
              <strong>{userData.following}</strong>
              <div className="text-muted small">Following</div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* Posts Grid */}
      <div className="row g-2">
        {allPosts.map((post, idx) => {
          const mediaItems = typeof post === 'string' ? [{ url: post, type: 'image' }] : post.media;
          const firstMedia = mediaItems[0];

          return (
            <div
              className="col-4 col-md-3"
              key={idx}
              onClick={() => setSelectedPost(mediaItems)} // Pass all media
              style={{ cursor: 'pointer' }}
            >
              <div
                className="ratio ratio-1x1 rounded overflow-hidden position-relative bg-light"
                style={{ minHeight: '150px' }} // Optional: to ensure height when content is loading
              >
                {firstMedia.type === 'video' ? (
                  <video
                    src={firstMedia.url}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                    muted
                    autoPlay
                    loop
                  />
                ) : (
                  <img
                    src={firstMedia.url}
                    alt="Post"
                    className="w-100 h-100"
                    style={{
                      objectFit: 'cover',
                      imageRendering: 'auto'
                    }}
                  />
                )}

                {mediaItems.length > 1 && (
                  <span
                    className="position-absolute top-0 end-0 m-1 d-flex justify-content-center align-items-center"
                    style={{
                      width: '13px',
                      height: '13px',
                      backgroundColor: '#fff',
                      color: '#000',
                      fontSize: '10px',
                      borderRadius: '3px',
                      fontWeight: 'bold',
                      border: '1px solid #ccc',
                    }}
                  >

                    {mediaItems.length}
                  </span>
                )}


              </div>

            </div>
          );
        })}
      </div>



  
      

      {/* Edit Profile Modal */}
      {showEdit && (
        <Modal title="Edit Profile" onClose={closeModals}>
          <div className="mb-3 text-center">
            <img
              src={newProfilePic ? URL.createObjectURL(newProfilePic) : userData.profilepic}
              alt="Preview"
              className="rounded-circle border"
              style={{ width: 100, height: 100, objectFit: 'cover' }}
            />
            <input
              type="file"
              accept="image/*"
              className="form-control mt-2"
              onChange={(e) => setNewProfilePic(e.target.files[0])}
            />
          </div>
          <input type="text" className="form-control mb-2" name="name" value={userData.name} onChange={handleChange} placeholder="Name" />
          <input type="text" className="form-control mb-2" name="username" value={userData.username} onChange={handleChange} placeholder="Username" />
          <textarea className="form-control mb-2" name="bio" value={userData.bio} onChange={handleChange} rows="2" placeholder="Bio" />
          <input type="email" className="form-control mb-2" name="email" value={userData.email} onChange={handleChange} placeholder="Email" />
          <input type="text" className="form-control mb-3" name="number" value={userData.number} onChange={handleChange} placeholder="Phone" />
          <button className="btn btn-primary w-100" onClick={handleSaveChanges}>Save Changes</button>
        </Modal>
      )}

      {/* Post Viewer Modal */}
      ;

      {selectedPost && (
        <div className="modal d-block" tabIndex="-1" onClick={() => setSelectedPost(null)}>
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content bg-dark text-white">
              <div className="modal-body p-0 position-relative">
                <div id="carouselPost" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    {selectedPost.map((media, i) => (

                      <div
                        className={`carousel-item ${i === 0 ? 'active' : ''}`}
                        key={i}
                        style={{ position: 'relative' }}


                      >

                        {/* Music Icon & Audio */}
                        {media.music && (

                          <>
                            <audio
                              ref={(el) => (audioRefs.current[i] = el)}
                              src={media.music}

                            />

                            <div

                              onClick={() => toggleAudio(i)}
                              style={{
                                position: 'absolute',
                                bottom: '50px',
                                right: '10px',
                                backgroundColor: 'rgba(187, 33, 33, 0.5)',
                                color: 'white',
                                padding: '8px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                zIndex: 10,
                              }}
                            >
                              {playingIndex === i ? <FaVolumeUp /> : <FaVolumeMute />}
                            </div>
                          </>
                        )}

                        {/* Index */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            backgroundColor: 'rgba(255, 255, 255, 0.85)',
                            color: '#000',
                            fontSize: '12px',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            zIndex: 10,
                          }}
                        >
                          {i + 1} / {selectedPost.length}
                        </div>

                        {/* Media Content */}
                        {media.type === 'video' ? (
                          <video
                            src={media.url}
                            className="d-block w-100"
                            controls
                            style={{ maxHeight: '80vh', objectFit: 'contain' }}
                          />
                        ) : (
                          <img
                            src={media.url}
                            className="d-block w-100"
                            alt={`media-${i}`}
                            style={{ maxHeight: '80vh', objectFit: 'contain' }}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Carousel Controls */}
                  {selectedPost?.length > 1 && (
                    <>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselPost"
                        data-bs-slide="prev"
                      >

                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselPost"
                        data-bs-slide="next"
                      >
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="modal-footer justify-content-center">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => {
                    // Stop all audio when closing
                    Object.values(audioRefs.current).forEach((audio) => {
                      audio.pause();
                      audio.currentTime = 0;
                    });
                    setSelectedPost(null);
                    setPlayingIndex(null);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

      )}

      {/* //profile large image modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.8)" }}
          onClick={() => setShowModal(false)}
        >
          <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <img
              src={userData.profilepic}
              alt="Profile Large"
              className="img-fluid rounded"
              style={{ maxHeight: "90%", maxWidth: "90%" }}
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking image
            />
          </div>
        </div>
      )}

      {/* Followers / Following Modal */}
      {modalType && (
        <Modal title={modalType === 'followers' ? 'Followers' : 'Following'} onClose={closeModals}>
          {dummyUsers.map((u, i) => (
            <div key={i} className="d-flex justify-content-between align-items-center border-bottom py-2">
              <div>
                <strong>{u.name}</strong>
                <div className="text-muted small">@{u.username}</div>
              </div>
              <button className="btn btn-sm btn-outline-primary">View</button>
            </div>
          ))}
        </Modal>
      )}
    </div>
  );
}

// Reusable Modal Component
function Modal({ title, children, onClose }) {
  return (
    <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="d-flex flex-column align-items-center justify-content-center h-100" style={{ pointerEvents: 'none' }}>
        <div className="bg-white rounded p-4" style={{ width: '90%', maxWidth: 400, pointerEvents: 'auto' }} onClick={(e) => e.stopPropagation()}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">{title}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Profile;
