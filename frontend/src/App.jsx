import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Insights";
import AddApplication from "./pages/AddApplication"; 
import EditApplication from "./pages/EditApplication"; 
import JobBoard from "./pages/JobBoard"; 
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import "./index.css"; 

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const handleLogout = async () => {
    setLoggingOut(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setToken("");
    setLoggingOut(false);
  };

  return (
    <Router>
      <div className="app-container">
        {loggingOut && (
          <div style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(10px)',
            padding: '12px 24px',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: 10000,
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            animation: 'slideDown 0.3s ease'
          }}>
            <div className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }}></div>
            <span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#fff' }}>Logging out...</span>
          </div>
        )}

        {token && <Navbar handleLogout={handleLogout} />}

        <Routes>
          <Route 
            path="/login" 
            element={!token ? <Login setToken={setToken} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/register" 
            element={!token ? <Register /> : <Navigate to="/dashboard" />} 
          />

          <Route 
            path="/dashboard" 
            element={token ? <Dashboard token={token} /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/jobs" 
            element={token ? <JobBoard token={token} /> : <Navigate to="/login" />} 
          />

          <Route 
            path="/profile" 
            element={token ? <Profile token={token} /> : <Navigate to="/login" />} 
          />

          <Route 
            path="/add-application" 
            element={token ? <AddApplication token={token} /> : <Navigate to="/login" />} 
          />

          <Route 
            path="/edit-application/:id" 
            element={token ? <EditApplication token={token} /> : <Navigate to="/login" />} 
          />

          <Route 
            path="/insights" 
            element={token ? <Stats token={token} /> : <Navigate to="/login" />} 
          />

          <Route 
            path="*" 
            element={<Navigate to={token ? "/dashboard" : "/login"} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;