import React, { useState } from 'react';
import Post from './Post';

const stories = [
  { username: 'john_doe', img: 'https://randomuser.me/api/portraits/men/1.jpg', status: 'Enjoying the sunshine!' },
  { username: 'jane_smith', img: 'https://randomuser.me/api/portraits/women/2.jpg', status: 'Lovely day at the beach.' },
  { username: 'alex', img: 'https://randomuser.me/api/portraits/men/3.jpg', status: 'Working hard!' },
  { username: 'emma', img: 'https://randomuser.me/api/portraits/women/4.jpg', status: 'Coffee time.' },
  { username: 'mike', img: 'https://randomuser.me/api/portraits/men/5.jpg', status: 'Gym session.' },
  { username: 'lucy', img: 'https://randomuser.me/api/portraits/women/6.jpg', status: 'Traveling!' }
];

function Feed() {
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
                src="https://randomuser.me/api/portraits/men/10.jpg"
                alt="Your Story"
                className="rounded-circle border"
                style={{ width: 56, height: 56, objectFit: 'cover', border: '2px solid #e1306c' }}
              />
              <span
                className="position-absolute bottom-0 end-0 bg-primary rounded-circle d-flex justify-content-center align-items-center"
                style={{ width: 22, height: 22, border: '2px solid #fff' }}
              >
                <i className="fas fa-plus text-white"></i>
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
        {/* Posts */}
        <Post
          username="john_doe"
          image="https://picsum.photos/500/300"
          caption="Enjoying the sunshine!"
          profileImg="https://randomuser.me/api/portraits/men/1.jpg"
        />
        <Post
          username="jane_smith"
          image="https://picsum.photos/500/301"
          caption="Lovely day at the beach."
          profileImg="https://randomuser.me/api/portraits/women/2.jpg"
        />
        <Post
          username="video_user"
          type="video"
          videoUrl="https://www.w3schools.com/html/mov_bbb.mp4"
          caption="Check out this cool video!"
          profileImg="https://randomuser.me/api/portraits/men/3.jpg"
        />
        <Post
          username="reel_user"
          type="reel"
          videoUrl="https://www.w3schools.com/html/movie.mp4"
          caption="My latest reel!"
          profileImg="https://randomuser.me/api/portraits/women/4.jpg"
        />

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
