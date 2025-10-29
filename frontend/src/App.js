import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import PrakritiForm from './components/PrakritiForm';
import Recommendations from './components/Recommendations';
import Progress from './components/Progress';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <div className="app">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/prakriti" element={isAuthenticated ? <PrakritiForm /> : <Navigate to="/login" />} />
          <Route path="/recommendations" element={isAuthenticated ? <Recommendations /> : <Navigate to="/login" />} />
          <Route path="/progress" element={isAuthenticated ? <Progress /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;