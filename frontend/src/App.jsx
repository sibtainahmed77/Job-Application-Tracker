import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [token, setToken] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="App">
      {!token ? (
        showRegister ? (
          <>
            <Register />
            <button onClick={() => setShowRegister(false)}>Go to Login</button>
          </>
        ) : (
          <>
            <Login setToken={setToken} />
            <button onClick={() => setShowRegister(true)}>Go to Register</button>
          </>
        )
      ) : (
        <Dashboard token={token} setToken={setToken} /> 
      )}
    </div>
  );
}

export default App;
