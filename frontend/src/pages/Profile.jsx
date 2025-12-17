import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = ({ token }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [links, setLinks] = useState({
    portfolio: "",
    linkedin: "",
    github: "",
    resume: ""
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        if (res.data.assets) setLinks(res.data.assets);
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const handleSave = async () => {
    try {
      const res = await axios.put("http://localhost:5000/api/auth/update", 
        { assets: links },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data);
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update profile assets.");
    }
  };

  const formatDate = (dateString) => {
    const date = dateString ? new Date(dateString) : new Date();
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) return <div className="app-container"><p>Loading profile...</p></div>;

  const stack = ["MongoDB", "Express", "React", "Node.js", "Docker"];
  const icons = { portfolio: "🌐", linkedin: "🔗", github: "📁", resume: "📄" };

  return (
    <div className="app-container">
      <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Professional Identity</h2>
        <button 
          className={isEditing ? "primary-btn" : "btn-outline"} 
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          style={{ fontSize: '0.8rem', padding: '0.6rem 1.2rem' }}
        >
          {isEditing ? "Save Assets" : "Edit Assets"}
        </button>
      </header>

      <div className="form-grid" style={{ gridTemplateColumns: "1fr 1.5fr", alignItems: 'start' }}>
        
        {/* Left Side: Identity Card - RESTORED & ENHANCED */}
        <div className="glass-card" style={{ textAlign: "center", padding: "3rem 2rem" }}>
          <div style={{ 
            width: "100px", height: "100px", borderRadius: "32px", 
            background: "linear-gradient(45deg, var(--primary-color), #6366f1)", 
            margin: "0 auto 1.5rem", display: "flex", alignItems: "center", 
            justifyContent: "center", fontSize: "3rem", color: "#0f172a", fontWeight: "bold",
            boxShadow: '0 10px 20px rgba(99, 102, 241, 0.2)'
          }}>
            {user?.name?.charAt(0)}
          </div>
          
          <h3 style={{ fontSize: "1.8rem", margin: "0", color: '#fff' }}>{user?.name}</h3>
          <p style={{ color: "var(--primary-color)", margin: "0.5rem 0 1.5rem", fontWeight: "600", fontSize: '1rem' }}>
            Software Engineer
          </p>

          <div style={{ 
            textAlign: 'left', 
            marginTop: "2rem", 
            paddingTop: "1.5rem", 
            borderTop: "1px solid var(--border-color)",
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address</label>
              <p style={{ color: '#fff', fontSize: '0.95rem', margin: '0.2rem 0' }}>{user?.email}</p>
            </div>
            
            <div>
              <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Account Status</label>
              <p style={{ color: '#fff', fontSize: '0.95rem', margin: '0.2rem 0' }}>Verified Member</p>
            </div>

            <div>
              <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Member Since</label>
              <p style={{ color: 'var(--primary-color)', fontSize: '0.95rem', margin: '0.2rem 0', fontWeight: '500' }}>
                {formatDate(user?.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {/* Tech Stack */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h4 style={{ marginBottom: "1.2rem", fontSize: "0.8rem", color: "var(--primary-color)", textTransform: "uppercase", letterSpacing: '1px' }}>
              Technical Stack
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
              {stack.map((item) => (
                <span key={item} style={{ padding: "0.5rem 1rem", background: "rgba(255,255,255,0.05)", borderRadius: "10px", fontSize: "0.85rem", border: "1px solid var(--border-color)", color: '#fff' }}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Compact Professional Assets */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h4 style={{ marginBottom: "1.2rem", fontSize: "0.8rem", color: "var(--primary-color)", textTransform: "uppercase", letterSpacing: '1px' }}>
              Professional Assets
            </h4>
            
            {isEditing ? (
              <div style={{ display: "grid", gridTemplateColumns: '1fr 1fr', gap: "1.5rem" }}>
                {Object.keys(links).map((key) => (
                  <div key={key}>
                    <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "capitalize", display: 'block', marginBottom: '0.5rem' }}>{key} Link</label>
                    <input 
                      type="text" 
                      value={links[key]} 
                      onChange={(e) => setLinks({...links, [key]: e.target.value})}
                      placeholder={`https://...`}
                      style={{ margin: 0, padding: "0.8rem", background: "rgba(0,0,0,0.2)", border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', width: '100%' }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {Object.keys(links).map((key) => (
                  links[key] && (
                    <a 
                      key={key} 
                      href={links[key]} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="compact-link"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "0.7rem 1.2rem",
                        background: "rgba(99, 102, 241, 0.1)",
                        borderRadius: "12px",
                        border: "1px solid rgba(99, 102, 241, 0.2)",
                        textDecoration: "none",
                        color: "#fff",
                        fontSize: "0.9rem",
                        transition: "all 0.3s ease"
                      }}
                    >
                      <span style={{ fontSize: '1.1rem' }}>{icons[key]}</span>
                      <span style={{ textTransform: "capitalize", fontWeight: "600" }}>{key}</span>
                    </a>
                  )
                ))}
                {!Object.values(links).some(x => x) && (
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontStyle: 'italic' }}>
                    No assets linked. Click "Edit Assets" to add your profile links.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;