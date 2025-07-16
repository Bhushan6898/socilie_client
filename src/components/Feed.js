import React from 'react';
import Post from './Post';

function Feed() {
  return (
    <div>
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
    </div>
  );
}

export default Feed;
