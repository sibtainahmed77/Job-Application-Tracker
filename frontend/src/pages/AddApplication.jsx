import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddApplication = ({ token }) => {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    company: "",
    title: "",
    jobType: "Full-time",
    location: "",
    salary: "",
    notes: "",
    status: "Applied",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:5000/api/applications",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/dashboard");
    } catch (err) {
      const serverMessage = err.response?.data?.message || "Failed to add application.";
      setError(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="page-header">
        <div>
          <h2>New Application</h2>
          <p style={{ color: "var(--text-muted)" }}>Keep track of your latest job opportunity.</p>
        </div>
      </header>

      <div className="card">
        {error && (
          <div style={{ color: "var(--error-color)", marginBottom: "1.5rem", padding: "1rem", background: "rgba(239, 68, 68, 0.1)", borderRadius: "8px" }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="input-group">
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Company Name</label>
              <input
                name="company"
                placeholder="e.g. Google"
                value={form.company}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Job Title</label>
              <input
                name="title"
                placeholder="e.g. Frontend Engineer"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Job Type</label>
              <select name="jobType" value={form.jobType} onChange={handleChange}>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div className="input-group">
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Location</label>
              <input
                name="location"
                placeholder="e.g. New York or Remote"
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Salary (Optional)</label>
              <input
                name="salary"
                placeholder="e.g. $80k - $100k"
                value={form.salary}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Application Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Notes</label>
            <textarea
              name="notes"
              placeholder="Job description link, contact person, etc."
              value={form.notes}
              onChange={handleChange}
              rows="4"
              style={{ marginBottom: "1.5rem" }}
            />
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={loading}
              style={{ flex: 2 }}
            >
              {loading ? "Saving..." : "Add Application"}
            </button>
            <button 
              type="button" 
              className="btn-outline" 
              onClick={() => navigate("/dashboard")}
              style={{ flex: 1 }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddApplication;