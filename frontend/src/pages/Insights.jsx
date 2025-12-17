import React, { useState, useEffect } from "react";
import axios from "axios";

const Insights = ({ token }) => {
  const [apps, setApps] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appRes, userRes] = await Promise.all([
          axios.get("http://localhost:5000/api/applications", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);
        setApps(appRes.data);
        setUser(userRes.data);
      } catch (err) {
        console.error("Error fetching stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const getCount = (status) => apps.filter(app => app.status === status).length;

  const stats = [
    { label: "Total Applications", value: apps.length, color: "var(--primary-color)", icon: "📁" },
    { label: "Interviews scheduled", value: getCount("Interview"), color: "#fbbf24", icon: "🤝" },
    { label: "Offers Won", value: getCount("Offer"), color: "#4ade80", icon: "🏆" },
    { label: "Rejections", value: getCount("Rejected"), color: "#f87171", icon: "🚫" },
  ];

  const interviewRate = apps.length > 0 ? ((getCount("Interview") / apps.length) * 100).toFixed(0) : 0;

  if (loading) return <div className="app-container"><p>Gathering intelligence...</p></div>;

  return (
    <div className="app-container">
      <header className="page-header">
        <div>
          <h2>Search Insights</h2>
          <p style={{ color: "var(--text-muted)" }}>Performance metrics for {user ? user.name : "User"}</p>
        </div>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        {stats.map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: "1.5rem", position: "relative", overflow: "hidden" }}>
            <span style={{ fontSize: "2rem", marginBottom: "1rem", display: "block" }}>{s.icon}</span>
            <h4 style={{ color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>{s.label}</h4>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: s.color }}>{s.value}</div>
            <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "80px", height: "80px", background: s.color, filter: "blur(50px)", opacity: "0.15" }}></div>
          </div>
        ))}
      </div>

      <div className="form-grid" style={{ gridTemplateColumns: "1.5fr 1fr" }}>
        <div className="glass-card" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h4 style={{ marginBottom: "1.5rem" }}>Funnel Conversion Rate</h4>
          <div style={{ marginBottom: "0.5rem", display: "flex", justifyContent: "space-between" }}>
            <span>Interview Invitations</span>
            <span style={{ color: "var(--primary-color)" }}>{interviewRate}% Rate</span>
          </div>
          <div className="progress-container">
            <div 
              className="progress-fill" 
              style={{ width: `${interviewRate}%` }}
            ></div>
          </div>
          <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Calculated from total applications vs. interviews granted.
          </p>
        </div>

        <div className="glass-card" style={{ textAlign: "center", border: "1px dashed var(--border-color)", background: "transparent" }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🎯</div>
          <h4>Next Milestone</h4>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            {apps.length < 10 ? "Apply to 10 jobs to unlock deeper analytics." : "Target: 5 Interviews for maximum success."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Insights;