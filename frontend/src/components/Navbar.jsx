import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ handleLogout }) => {
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="logo" style={{ textDecoration: 'none' }}>
        Job<span style={{ color: "var(--text-color)" }}>Tracker</span>
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
            Add New
          </Link>
        </li>
        <li>
          <Link to="/stats" className={isActive("/stats")}>
            Stats
          </Link>
        </li>
      </ul>

      <button onClick={handleLogout} className="btn-outline">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;