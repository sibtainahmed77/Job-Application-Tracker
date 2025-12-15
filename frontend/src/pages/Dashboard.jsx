import React, { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";

const Dashboard = ({ token, setToken }) => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    company: "",
    title: "",
    jobType: "",
    location: "",
    salary: "",
    notes: "",
  });

  const fetchApplications = async () => {
    try {
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
        jobType: "",
        location: "",
        salary: "",
        notes: "",
      });
      setError("");
      fetchApplications();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create application");
    }
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <button onClick={() => setToken("")}>Logout</button>

      <h3>Add New Application</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="company"
          placeholder="Company"
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

        <select
          name="jobType"
          value={form.jobType}
          onChange={handleChange}
          required
        >
          <option value="">Select Job Type</option>
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

        <input
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
        />

        <input
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
        />

        <button type="submit">Add Application</button>
      </form>

      <h3>Applications List</h3>

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
          {applications.map((app) => (
            <tr key={app._id}>
              <td>{app.company}</td>
              <td>{app.title}</td>
              <td>{app.jobType}</td>
              <td>{app.location}</td>
              <td>{app.salary}</td>
              <td>{app.status}</td>
              <td>{new Date(app.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
