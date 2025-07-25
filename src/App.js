import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import RoutesPage from './RoutesPage';
import { useUser } from './hook/user/useUser';
import { useSelector } from 'react-redux';

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

  return (
    <>
      {showSidebarAndNavbar && <Navbar />}
      <div className="container mt-4">
        <RoutesPage />
      </div>
    </>
  );
}

export default App;
