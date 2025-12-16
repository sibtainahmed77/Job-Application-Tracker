import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if(token) {
        localStorage.setItem("token", token);
    } else {
        localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <div className="app-container">
      {!token ? (
        <div className="auth-wrapper">
          {showRegister ? (
            <>
              <Register setToken={setToken} />
              <button className="btn-secondary" onClick={() => setShowRegister(false)}>
                Already have an account? Login
              </button>
            </>
          ) : (
            <>
              <Login setToken={setToken} />
              <button className="btn-secondary" onClick={() => setShowRegister(true)}>
                Don't have an account? Register
              </button>
            </>
          )}
        </div>
      ) : (
        <Dashboard token={token} setToken={setToken} />
      )}
    </div>
  );
}

export default App;