import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login({ setIsLoggedIn, setIsStaff }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to handle error messages
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    if (username === "staff" && password === "bitstaff") {
      setIsStaff(true);
      setIsLoggedIn(true);
      navigate("/staff"); // Navigate to staff page
    } else {
      // For any other username and password, log in as a regular user
      setIsStaff(false);
      setIsLoggedIn(true);
      navigate("/domain"); // Navigate to home page
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form className="login-form">
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
}

export default Login;
