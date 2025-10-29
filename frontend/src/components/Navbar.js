import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Health & Wellness</div>
      <ul className="navbar-links">
        {isAuthenticated ? (
          <>
            <li><Link to="/prakriti">Prakriti Analysis</Link></li>
            <li><Link to="/recommendations">Recommendations</Link></li>
            <li><Link to="/progress">Progress</Link></li>
            <li><button onClick={handleLogout} className="navbar-button">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;