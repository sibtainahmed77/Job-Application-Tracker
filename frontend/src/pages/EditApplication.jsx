import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditApplication = ({ token }) => {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/applications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const appToEdit = res.data.find((a) => a._id === id);
        if (appToEdit) {
          setForm(appToEdit);
        }
        setLoading(false);
      } catch (err) {
        setError("Could not fetch application data.");
        setLoading(false);
      }
    };
    fetchApplication();
  }, [id, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/applications/${id}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed.");
    }
  };

  if (loading) return <div className="app-container"><p>Loading application...</p></div>;

  return (
    <div className="app-container">
      <header className="page-header">
        <div>
          <h2>Edit Application</h2>
          <p style={{ color: "var(--text-muted)" }}>Update your progress for {form.company}.</p>
        </div>
      </header>

      <div className="glass-card">
        {error && (
          <div style={{ color: "var(--error-color)", marginBottom: "1.5rem", padding: "1rem", background: "rgba(239, 68, 68, 0.1)", borderRadius: "8px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="input-group">
              <label>Company Name</label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Job Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label>Job Type</label>
              <select name="jobType" value={form.jobType} onChange={handleChange}>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div className="input-group">
              <label>Location</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label>Salary</label>
              <input
                name="salary"
                value={form.salary}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Application Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows="4"
              style={{ marginBottom: "1.5rem" }}
            />
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button type="submit" className="primary-btn" style={{ flex: 2 }}>
              Update Application
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

export default EditApplication;