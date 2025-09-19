import React, { useState } from 'react';
import Post from './post/Post';
import { useSelector } from 'react-redux';
import profilpicture from '../asset/profile.png';
import { useNavigate } from 'react-router-dom';
const stories = [
  { username: 'Bhushan Patil', img: 'https://res.cloudinary.com/dl35wuxhn/image/upload/v1751878744/user-images/user_652cb3593dbba5f70aa925df37650af581f20c63436823da4eb771d7e5878f00.jpg', status: 'Enjoying the sunshine!' },
  { username: 'arjun_kumar', img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', status: 'Exploring new tech today!' },
  { username: 'priya_sharma', img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', status: 'Evening chai vibes.' },
  { username: 'ananya_patil', img: 'https://images.unsplash.com/photo-1542596594-649edbc13630?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', status: 'Learning React with fun.' },
  { username: 'rohit_singh', img: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', status: 'Morning jog completed.' },
  { username: 'isha_gupta', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', status: 'Weekend shopping spree!' },
  { username: 'manish_yadav', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', status: 'Long drive ahead 🚗' },
  { username: 'sneha_reddy', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', status: 'Cooking something special.' },
  { username: 'vivek_dubey', img: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', status: 'Football practice time.' },
  { username: 'aarti_menon', img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', status: 'Yoga for peace 🧘‍♀️' },
  { username: 'sanjay_pandey', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', status: 'Watching latest Bollywood movie.' },
  { username: 'divya_nair', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', status: 'Reading a new novel 📖' },
  { username: 'akash_mehta', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', status: 'Workout never stops.' },
  { username: 'kavya_iyer', img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', status: 'Exploring Goa beaches 🌊' }
 
];

function Feed() {
   const navigate = useNavigate();
    const user = useSelector((state) => state.auth.userdata);
  const [showModal, setShowModal] = useState(false);
  const [activeStory, setActiveStory] = useState(null);

  const handleStoryClick = (story) => {
    setActiveStory(story);
    setShowModal(true);
  };

  return (
    <div className="d-flex justify-content-center" style={{ paddingBottom: 70 }}>
      <div style={{ maxWidth: 500, width: '100%' }}>
        {/* Status Bar */}
        <div className="d-flex overflow-auto py-2 mb-3" style={{ gap: 16 }}>
          {/* Your Story with Plus Icon */}
          <div className="text-center" style={{ width: 70 }}>
            <div className="position-relative mx-auto" style={{ width: 56, height: 56 }}>
              <img
                src={user.profilePicture || profilpicture}
                alt="Your Story"
                className="rounded-circle border"
                style={{ width: 56, height: 56, objectFit: 'cover', border: '2px solid #e1306c' }}
              />
              <span
                className="position-absolute bottom-0 end-0 bg-primary rounded-circle d-flex justify-content-center align-items-center"
                style={{ width: 22, height: 22, border: '2px solid #fff' }}
              >
                <i className="fas fa-plus text-white"onClick={() => navigate("/create/story")} ></i>
              </span>
            </div>
            <div style={{ fontSize: 12, whiteSpace: 'nowrap' }}>Your Story</div>
          </div>
          {/* Other Stories */}
          {stories.map((story, idx) => (
            <div key={idx} className="text-center" style={{ width: 70, cursor: 'pointer' }} onClick={() => handleStoryClick(story)}>
              <img
                src={story.img}
                alt={story.username}
                className="rounded-circle border"
                style={{ width: 56, height: 56, objectFit: 'cover', border: '2px solid #e1306c' }}
              />
              <div style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{story.username}</div>
            </div>
          ))}
        </div>
       
       
      <Post />

        {/* Status Modal */}
        {showModal && activeStory && (
          <div
            className="modal fade show"
            style={{
              display: 'block',
              background: 'rgba(0,0,0,0.7)',
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 2000
            }}
            tabIndex="-1"
            onClick={() => setShowModal(false)}
          >
            <div
              className="d-flex flex-column align-items-center justify-content-center h-100"
              style={{ pointerEvents: 'none' }}
            >
              <div
                className="bg-white rounded p-4"
                style={{ maxWidth: 320, pointerEvents: 'auto' }}
                onClick={e => e.stopPropagation()}
              >
                <img
                  src={activeStory.img}
                  alt={activeStory.username}
                  className="rounded-circle mb-3"
                  style={{ width: 80, height: 80, objectFit: 'cover', border: '2px solid #e1306c' }}
                />
                <h5 className="mb-2">{activeStory.username}</h5>
                <p>{activeStory.status}</p>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Feed;
