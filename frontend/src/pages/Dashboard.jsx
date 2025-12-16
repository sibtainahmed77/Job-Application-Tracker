import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = ({ token, setToken }) => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    company: "",
    title: "",
    jobType: "Full-time",
    location: "",
    salary: "",
    notes: "",
  });

  const fetchApplications = async () => {
    try {
      if (!token) return;
      const res = await axios.get("http://localhost:5000/api/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch applications");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/applications", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ 
        company: "", 
        title: "", 
        jobType: "Full-time", 
        location: "", 
        salary: "", 
        notes: "" 
      });
      setError("");
      fetchApplications();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create application");
    }
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Job Tracker</h2>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>

      <div className="card" style={{ maxWidth: '100%', marginBottom: '2rem' }}>
        <h3>Add New Application</h3>
        {error && <div className="error-msg" style={{marginBottom: '1rem'}}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <input
              name="company"
              placeholder="Company Name"
              value={form.company}
              onChange={handleChange}
              required
            />
            <input
              name="title"
              placeholder="Job Title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-grid">
            <select name="jobType" value={form.jobType} onChange={handleChange}>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
            <input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-grid">
            <input
              name="salary"
              placeholder="Salary (e.g. 60k)"
              value={form.salary}
              onChange={handleChange}
            />
            <input
              name="notes"
              placeholder="Notes / Status"
              value={form.notes}
              onChange={handleChange}
            />
          </div>

          <button type="submit" style={{marginTop: '0.5rem'}}>Add Application</button>
        </form>
      </div>

      <h3>Application History</h3>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Type</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {applications.length === 0 ? (
            <tr>
              <td colSpan="7" style={{textAlign: 'center', color: '#9ca3af'}}>
                No applications found. Add one above!
              </td>
            </tr>
          ) : (
            applications.map((app) => (
              <tr key={app._id}>
                <td>{app.company}</td>
                <td>{app.title}</td>
                <td>{app.jobType}</td>
                <td>{app.location}</td>
                <td>{app.salary || '-'}</td>
                <td>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: app.status === 'Applied' ? '#3b82f6' : '#10b981',
                    fontSize: '0.85rem'
                  }}>
                    {app.status}
                  </span>
                </td>
                <td>{new Date(app.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;