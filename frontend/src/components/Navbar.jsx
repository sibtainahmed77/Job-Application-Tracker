import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ handleLogout }) => {
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="logo">
        Job<span>Tracker</span>
      </Link>

      <ul className="nav-links">
        <li>
          <Link to="/dashboard" className={isActive("/dashboard")}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/jobs" className={isActive("/jobs")}>
            Job Board
          </Link>
        </li>
        <li>
          <Link to="/add-application" className={isActive("/add-application")}>
            New
          </Link>
        </li>
        <li>
          <Link to="/insights" className={isActive("/insights")}>
            Insights
          </Link>
        </li>
        <li>
          <Link to="/profile" className={isActive("/profile")}>
            Profile
          </Link>
        </li>
      </ul>

      <button 
        onClick={handleLogout} 
        className="btn-logout-nav"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;