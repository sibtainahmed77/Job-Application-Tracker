import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";
import AddApplication from "./pages/AddApplication"; 
import EditApplication from "./pages/EditApplication"; 
import JobBoard from "./pages/JobBoard"; 
import Navbar from "./components/Navbar";
import "./index.css"; 

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const handleLogout = () => {
    setToken("");
  };

  return (
    <Router>
      <div className="app-container">
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
            path="/add-application" 
            element={token ? <AddApplication token={token} /> : <Navigate to="/login" />} 
          />

          <Route 
            path="/edit-application/:id" 
            element={token ? <EditApplication token={token} /> : <Navigate to="/login" />} 
          />

          <Route 
            path="/stats" 
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