import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import RoutesPage from "./RoutesPage";
import { useUser } from "./hook/user/useUser";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { getconnect, getuser } = useUser();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
      getuser();  
    const init = async () => {
      try {
        await getconnect();   // Check backend/server connection
           // Load user if available
      } catch (err) {
        console.error("Connection or user fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);



  return (
    <>
      {isAuthenticated && <Navbar />}
      <div className=" mt-4">
        <RoutesPage />
      </div>
    </>
  );
}

export default App;
