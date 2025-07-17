import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import Notifications from './pages/Notifications';
import Messages from './pages/Messages';
import PostPage from './pages/PostPage';
import SearchBarPage from './pages/SearchBarPage';
import VideoFeedPage from './pages/VideoFeedPage';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={
            <div className="row">
              <div className="col-md-8">
                <Feed />
              </div>
              <div className="col-md-4">
                {/* Sidebar or Profile */}
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
      </div>
    </Router>
  );
}

export default App;

