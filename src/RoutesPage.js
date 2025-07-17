import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import Notifications from './pages/Notifications';
import Messages from './pages/Messages';
import PostPage from './pages/PostPage';
import SearchBarPage from './pages/SearchBarPage';
import VideoFeedPage from './pages/VideoFeedPage';

function RoutesPage() {
  // Dummy authentication flag (replace with real auth logic)
  const isAuthenticated = false;

  return (
    <Routes>
      <Route path="/" element={
        <div className="row">
          <div className="col-md-8">
            <Feed />
          </div>
          <div className="col-md-4">

          </div>
        </div>
      } />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/searchbar" element={<SearchBarPage />} />
      <Route path="/video" element={<VideoFeedPage />} />
    </Routes>
  );
}




export default RoutesPage;
