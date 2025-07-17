import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import RoutesPage from './RoutesPage';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <RoutesPage />
      </div>
    </Router>
  );
}



export default App;

