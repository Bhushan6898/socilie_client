import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { OrbitProgress } from 'react-loading-indicators';

// Dummy components (replace with actual imports if available)
import Feed from './components/Feed';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import Notifications from './pages/Notifications';
import Messages from './pages/Messages';
import Page from './pages/postdata/index.js';
import PostPage from './pages/postdata/CreatePostPage.js';
import ReelPage from './pages/postdata/CreateReelPage.js';
import StoryPage from './pages/postdata/CreateStoryPage.js';
import SearchBarPage from './pages/SearchBarPage';
import VideoFeedPage from './pages/VideoFeedPage.js';
import { useUser } from './hook/user/useUser';
import UserProfile from './pages/userinformation.js';
import Setting from './components/setting/index.js';
import Activity from './components/setting/activity/index.js';
import MusicApp from './pages/postdata/musiclistdata.js';
function App() {
  const { getconnect } = useUser();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [loading, setLoading] = useState(true);
  const [showSidebarAndNavbar, setShowSidebarAndNavbar] = useState(false);

  useEffect(() => {
    getconnect();

    const timeout = setTimeout(() => {
      setShowSidebarAndNavbar(isAuthenticated);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isAuthenticated]);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <OrbitProgress color="#32cd32" size="medium" text="Loading..." textColor="" />
      </div>
    );
  }

  return (

    <>

      <div className="container mt-4">
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated
                ? <Navigate to="/" replace />
                : <Login />
            }
          />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<PrivateRoute><Feed /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
          <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
          <Route path="/post" element={<PrivateRoute><Page /></PrivateRoute>} />
          <Route path="/create/post" element={<PrivateRoute><PostPage /></PrivateRoute>} />
          <Route path="/create/reel" element={<PrivateRoute><ReelPage /></PrivateRoute>} />
          <Route path="/create/story" element={<PrivateRoute><StoryPage /></PrivateRoute>} />
          <Route path="/searchbar" element={<PrivateRoute><SearchBarPage /></PrivateRoute>} />
          <Route path="/video" element={<PrivateRoute><VideoFeedPage /></PrivateRoute>} />
          <Route path="/userinfo/:id" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          <Route path="/setting" element={<PrivateRoute><Setting /></PrivateRoute>} />
          <Route path="/activity" element={<PrivateRoute><Activity /></PrivateRoute>} />
           <Route path="/music" element={<PrivateRoute><MusicApp /></PrivateRoute>} />
        </Routes>

      </div>
    </>
  );
}

export default App;
