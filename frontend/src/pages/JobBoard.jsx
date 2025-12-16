import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JobBoard = ({ token }) => {
  const navigate = useNavigate();

  const availableJobs = [
    { id: 1, company: "Google", title: "Frontend Developer", location: "Remote", jobType: "Full-time", salary: "$120k" },
    { id: 2, company: "Meta", title: "Product Designer", location: "Menlo Park, CA", jobType: "Full-time", salary: "$140k" },
    { id: 3, company: "Amazon", title: "Software Engineer", location: "Seattle, WA", jobType: "Internship", salary: "$50/hr" },
    { id: 4, company: "Netflix", title: "UI Engineer", location: "Remote", jobType: "Full-time", salary: "$150k" },
    { 
    id: 5, 
    company: "Apple", 
    title: "iOS Engineer", 
    location: "Cupertino, CA", 
    jobType: "Full-time", 
    salary: "$160k" 
  },
  { 
    id: 6, 
    company: "Tesla", 
    title: "Fullstack Engineer", 
    location: "Austin, TX", 
    jobType: "Remote", 
    salary: "$130k" 
  }
  ];

  const handleQuickApply = async (job) => {
    try {
      await axios.post(
        "http://localhost:5000/api/applications",
        {
          company: job.company,
          title: job.title,
          location: job.location,
          jobType: job.jobType,
          salary: job.salary,
          status: "Applied",
          notes: "Applied via Internal Job Board"
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Successfully applied to ${job.company}!`);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Already applied to this job");
    }
  };

  return (
    <div className="app-container">
      <header className="page-header">
        <div>
          <h2>Job Board</h2>
          <p style={{ color: "var(--text-muted)" }}>Explore open positions and apply with one click.</p>
        </div>
      </header>

      <div className="stats-grid">
        {availableJobs.map((job) => (
          <div key={job.id} className="glass-card stats-card" style={{ gap: '10px' }}>
            <div className="stat-label">{job.company}</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>{job.title}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{job.location} • {job.jobType}</p>
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '800', color: 'var(--primary-color)' }}>{job.salary}</span>
              <button className="primary-btn" onClick={() => handleQuickApply(job)}>Apply Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobBoard;