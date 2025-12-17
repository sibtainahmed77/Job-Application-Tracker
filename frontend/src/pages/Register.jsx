import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name, email, password,
      });
      setIsSuccess(true); 
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  if (isSuccess) {
    return (
      <div className="auth-wrapper">
        <div className="glass-card auth-card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: "3.5rem", marginBottom: "0.5rem" }}>✨</div>
          <h2 style={{ color: "var(--success-color)" }}>Success!</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Your professional journey starts here.
          </p>
          <Link to="/login">
            <button className="primary-btn" style={{ width: "100%" }}>Login Now</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-wrapper">
      <div className="glass-card auth-card">
        <h2>Create Account</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", textAlign: "center", fontSize: "0.9rem" }}>
          Track your career growth today
        </p>
        
        {error && <div className="error-message" style={{ marginBottom: "1rem" }}>⚠️ {error}</div>}
        
        <form onSubmit={handleSubmit} style={{ gap: "1rem" }}>
          <input 
            type="text" 
            placeholder="Full Name" 
            className={error ? "error-input" : ""}
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            className={error ? "error-input" : ""}
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className={error ? "error-input" : ""}
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit" className="primary-btn" style={{ marginTop: "0.5rem" }}>
            Register
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: '700', textDecoration: 'none' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;