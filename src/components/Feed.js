import React from 'react';
import Post from './Post';

function Feed() {
  return (
    <div className="d-flex justify-content-center">
      <div style={{ maxWidth: 500, width: '100%' }}>
        {/* Image posts */}
        <Post
          username="john_doe"
          image="https://picsum.photos/500/300"
          caption="Enjoying the sunshine!"
        />
        <Post
          username="jane_smith"
          image="https://picsum.photos/500/301"
          caption="Lovely day at the beach."
        />
        {/* Dummy video post */}
        <Post
          username="video_user"
          type="video"
          videoUrl="https://www.w3schools.com/html/mov_bbb.mp4"
          caption="Check out this cool video!"
        />
        {/* Dummy reel post */}
        <Post
          username="reel_user"
          type="reel"
          videoUrl="https://www.w3schools.com/html/movie.mp4"
          caption="My latest reel!"
        />
      </div>
    </div>
  );
}

export default Feed;
