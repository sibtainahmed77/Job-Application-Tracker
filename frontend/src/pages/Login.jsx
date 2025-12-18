import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const [res] = await Promise.all([
        axios.post("http://localhost:5000/api/auth/login", { email, password }),
        new Promise((resolve) => setTimeout(resolve, 1800))
      ]);
      setToken(res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="glass-card auth-card" style={{ position: 'relative', overflow: 'hidden' }}>
        
        {loading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            animation: 'fadeIn 0.3s ease'
          }}>
            <div className="spinner"></div>
            <p style={{ marginTop: '1.5rem', fontWeight: '600', color: 'var(--primary-color)', letterSpacing: '1px' }}>
              LOGGING IN...
            </p>
          </div>
        )}

        <h2>Welcome Back</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem", textAlign: "center" }}>
          Please enter your details to continue
        </p>

        {error && <div className="error-message">❌ {error}</div>}

        <form onSubmit={handleSubmit} style={{ gap: "1.5rem" }}>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email Address" 
              className={error ? "error-input" : ""}
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Password" 
              className={error ? "error-input" : ""}
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="primary-btn" style={{ marginTop: "0.5rem" }}>
            Sign In
          </button>
        </form>

        <p style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          New here? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: '700', textDecoration: 'none' }}>Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;