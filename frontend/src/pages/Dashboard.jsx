import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ token }) => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  const fetchApplications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [token]);

  const deleteApp = async (id) => {
    if (window.confirm("Are you sure you want to remove this application?")) {
      try {
        await axios.delete(`http://localhost:5000/api/applications/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchApplications();
      } catch (err) {
        console.error("Error deleting application", err);
      }
    }
  };

  return (
    <div className="app-container">
      <header className="page-header">
        <div>
          <h2>Career Pipeline</h2>
          <p style={{ color: "var(--text-muted)" }}>
            Tracking <strong>{applications.length}</strong> active opportunities
          </p>
        </div>
        <button className="primary-btn" onClick={() => navigate("/add-application")}>
          + New Application
        </button>
      </header>

      <div className="table-wrapper glass-card">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Type</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((app) => (
                <tr key={app._id}>
                  <td><div className="company-cell">{app.company}</div></td>
                  <td><div className="title-cell">{app.title}</div></td>
                  <td><span className="type-tag">{app.jobType}</span></td>
                  <td>
                    <span className={`status-pill ${app.status.toLowerCase()}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                      <button 
                        className="btn-outline" 
                        onClick={() => navigate(`/edit-application/${app._id}`)}
                        style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
                      >
                        Edit
                      </button>
                      
                      <button 
                        className="btn-delete" 
                        onClick={() => deleteApp(app._id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                  No applications found. Start your journey today!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;