import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ token }) => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
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

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = 
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="app-container">
      <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Career Pipeline</h2>
          <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
            Tracking <strong>{filteredApplications.length}</strong> active opportunities
          </p>
        </div>
        <button className="primary-btn" onClick={() => navigate("/add-application")}>
          + New Application
        </button>
      </header>

      <div className="glass-card" style={{ marginBottom: "3rem", display: "flex", gap: "1.5rem", padding: "1.5rem" }}>
        <input 
          type="text"
          placeholder="Search by company or position..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 3, margin: 0, background: 'rgba(0,0,0,0.2)' }}
        />
        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ 
            flex: 1, 
            margin: 0, 
            background: 'rgba(255, 255, 255, 0.05)', 
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            colorScheme: 'dark', 
            padding: '0.5rem',
            cursor: 'pointer'
          }}
        >
          <option value="All">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table style={{ borderCollapse: 'separate', borderSpacing: '0 8px', width: '100%', background: 'transparent' }}>
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Type</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
                <tr key={app._id} className="table-row-hover">
                  <td style={{ fontWeight: '700', color: '#fff' }}>{app.company}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{app.title}</td>
                  <td>
                    <span style={{ fontSize: '0.75rem', opacity: 0.7, border: '1px solid var(--border-color)', padding: '2px 8px', borderRadius: '4px' }}>
                      {app.jobType}
                    </span>
                  </td>
                  <td>
                    <span className={`status-pill ${app.status.toLowerCase()}`}>
                      {app.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                      <button 
                        className="btn-outline" 
                        onClick={() => navigate(`/edit-application/${app._id}`)}
                        style={{ padding: "0.5rem 1rem", fontSize: "0.75rem" }}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteApp(app._id)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.1rem', opacity: 0.6 }}
                        onMouseOver={(e) => e.target.style.opacity = 1}
                        onMouseOut={(e) => e.target.style.opacity = 0.6}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)" }}>
                  {applications.length === 0 
                    ? "No applications yet. Time to apply!" 
                    : "No matches found for your search."}
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