import React from 'react';
import Post from '../components/Post';

const videoPosts = [
  {
    username: 'video_user1',
    profileImg: 'https://randomuser.me/api/portraits/men/3.jpg',
    type: 'video',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    caption: 'Awesome video!'
  },
  {
    username: 'video_user2',
    profileImg: 'https://randomuser.me/api/portraits/women/4.jpg',
    type: 'video',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    caption: 'Check out my reel!'
  }
];

function VideoFeedPage() {
  return (
    <div className="d-flex justify-content-center" style={{ paddingBottom: 70 }}>
      <div style={{ maxWidth: 500, width: '100%' }}>
        {videoPosts.map((post, idx) => (
          <Post key={idx} {...post} />
        ))}
      </div>
    </div>
  );
}

export default VideoFeedPage;
