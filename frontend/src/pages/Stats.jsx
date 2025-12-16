import React, { useState, useEffect } from "react";
import axios from "axios";

const Stats = ({ token }) => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/applications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApps(res.data);
      } catch (err) {
        console.error("Error fetching stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, [token]);

  const getCount = (status) => apps.filter(app => app.status === status).length;

  // Calculate Success Rate (Offers / Total Apps)
  const successRate = apps.length > 0 
    ? ((getCount("Offer") / apps.length) * 100).toFixed(1) 
    : 0;

  if (loading) return <div className="app-container"><p>Loading insights...</p></div>;

  return (
    <div className="app-container">
      <header className="page-header">
        <div>
          <h2>Search Insights</h2>
          <p style={{ color: "var(--text-muted)" }}>A breakdown of your job search performance.</p>
        </div>
      </header>

      <div className="stats-grid">
        {/* Total Card */}
        <div className="card stats-card">
          <h4>Total Applications</h4>
          <div className="stat-value">{apps.length}</div>
        </div>

        {/* Success Rate Card */}
        <div className="card stats-card">
          <h4>Success Rate</h4>
          <div className="stat-value" style={{ color: "var(--success-color)" }}>{successRate}%</div>
        </div>
      </div>

      <div className="stats-grid" style={{ marginTop: "1.5rem" }}>
        {/* Interview Card */}
        <div className="card stats-card">
          <h4>Interviews</h4>
          <div className="stat-value" style={{ color: "var(--interview-color)" }}>
            {getCount("Interview")}
          </div>
        </div>

        {/* Offers Card */}
        <div className="card stats-card">
          <h4>Offers Received</h4>
          <div className="stat-value" style={{ color: "var(--success-color)" }}>
            {getCount("Offer")}
          </div>
        </div>

        {/* Rejected Card */}
        <div className="card stats-card">
          <h4>Rejections</h4>
          <div className="stat-value" style={{ color: "var(--error-color)" }}>
            {getCount("Rejected")}
          </div>
        </div>
      </div>

      {/* Motivation Tip */}
      <div className="card" style={{ marginTop: "2rem", textAlign: "center", borderStyle: "dashed" }}>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
          {apps.length === 0 
            ? "No data yet. Start applying to see your stats grow!" 
            : "Keep going! Consistency is the key to finding the right role."}
        </p>
      </div>
    </div>
  );
};

export default Stats;