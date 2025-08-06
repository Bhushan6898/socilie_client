import React from 'react';
import Post from '../components/Post';

const videoPosts = [
  {
    username: 'cartoon_hero1',
    profileImg: 'https://randomuser.me/api/portraits/men/11.jpg',
    type: 'video',
    videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    caption: 'Epic cartoon adventure!'
  },
  {
    username: 'anime_star2',
    profileImg: 'https://randomuser.me/api/portraits/women/22.jpg',
    type: 'video',
    videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4',
    caption: 'My new anime intro!'
  },
  {
    username: 'funny_doggo',
    profileImg: 'https://randomuser.me/api/portraits/men/33.jpg',
    type: 'video',
    videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    caption: 'Dog animation 😂'
  },
  {
    username: 'pixie_world',
    profileImg: 'https://randomuser.me/api/portraits/women/44.jpg',
    type: 'video',
    videoUrl: 'https://media.w3.org/2010/05/bunny/trailer.mp4',
    caption: 'Fairy tale in motion ✨'
  },
  {
    username: 'toon_racer',
    profileImg: 'https://randomuser.me/api/portraits/men/55.jpg',
    type: 'video',
    videoUrl: 'https://media.w3.org/2010/05/video/movie_300.mp4',
    caption: 'Race to the cartoon finish line 🏁'
  },
  {
    username: 'dragon_kid',
    profileImg: 'https://randomuser.me/api/portraits/women/66.jpg',
    type: 'video',
    videoUrl: 'https://media.w3.org/2010/05/video/movie_700.mp4',
    caption: 'Baby dragon flying 🔥'
  },
  {
    username: 'bubble_boy',
    profileImg: 'https://randomuser.me/api/portraits/men/77.jpg',
    type: 'video',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    caption: 'Floating through bubble town'
  },
  {
    username: 'zoo_kids',
    profileImg: 'https://randomuser.me/api/portraits/women/88.jpg',
    type: 'video',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    caption: 'Zoo animal adventures 🐘'
  },
  {
    username: 'magic_fox',
    profileImg: 'https://randomuser.me/api/portraits/men/99.jpg',
    type: 'video',
    videoUrl: 'https://media.w3.org/2010/05/video/movie_1080.mp4',
    caption: 'Mystical fox journey'
  },
  {
    username: 'tiny_toon',
    profileImg: 'https://randomuser.me/api/portraits/women/91.jpg',
    type: 'video',
    videoUrl: 'https://media.w3.org/2010/05/bunny/movie.mp4',
    caption: 'Toon time 🐰🎬'
  },
  {
    username: 'crazy_penguin',
    profileImg: 'https://randomuser.me/api/portraits/men/92.jpg',
    type: 'video',
    videoUrl: 'https://media.w3.org/2010/05/sintel/movie.mp4',
    caption: 'Chillin\' with penguins 🐧'
  },
  {
    username: 'robot_march',
    profileImg: 'https://randomuser.me/api/portraits/women/93.jpg',
    type: 'video',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    caption: 'March of the robots 🤖'
  },
  {
    username: 'fluffy_cloud',
    profileImg: 'https://randomuser.me/api/portraits/men/94.jpg',
    type: 'video',
    videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-30s.mp4',
    caption: 'Cloud town weather cartoon ☁️'
  },
  {
    username: 'alien_kid',
    profileImg: 'https://randomuser.me/api/portraits/women/95.jpg',
    type: 'video',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    caption: 'Alien meets earth kids 👽'
  },
  {
    username: 'super_cat',
    profileImg: 'https://randomuser.me/api/portraits/men/96.jpg',
    type: 'video',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    caption: 'The purr-fect hero 🐱💥'
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
