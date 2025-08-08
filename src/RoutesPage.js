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
import PostPage from './pages/PostPage';
import SearchBarPage from './pages/SearchBarPage';
import VideoFeedPage from './pages/VideoFeedPage.js';
import { useUser } from './hook/user/useUser';
import UserProfile from './pages/userinformation.js';

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
          {!isAuthenticated &&
            <Route path="/login" element={<Login />} />
          }
          <Route path="/register" element={<Register />} />

          {/* Private Routes */}
          <Route path="/" element={<PrivateRoute><Feed /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
          <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
          <Route path="/post" element={<PrivateRoute><PostPage /></PrivateRoute>} />
          <Route path="/searchbar" element={<PrivateRoute><SearchBarPage /></PrivateRoute>} />
          <Route path="/video" element={<PrivateRoute><VideoFeedPage /></PrivateRoute>} />
          <Route path="/userinfo/:id" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
