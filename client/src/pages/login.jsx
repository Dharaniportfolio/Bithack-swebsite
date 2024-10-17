import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function LoginPage({ setIsLoggedIn, setIsStaff }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', { username, password })
      .then((user) => {
        console.log(user.data);
        if (user.data === 'student') {
          setIsLoggedIn(true);
          setIsStaff(false);
          Navigate('/domain');
        } else if (user.data === 'staff') {
          setIsLoggedIn(true);
          setIsStaff(true);
          Navigate('/staff');
        } else {
          alert('Invalid credentials');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign-In clicked');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome Back!</h1>
        <img
          src="./assets/bit logo.png?height=80 &width=80"
          alt="Bannari Amman Institute of Technology Logo"
          className="login-logo"
        />
        <h3 className="login-subtitle">BANNARI AMMAN</h3>
        <h3 className="login-institute">INSTITUTE OF TECHNOLOGY</h3>
        <p className="login-motto">Stay Ahead</p>
        <h4 className="login-portal">BIT Information Portal</h4>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="google-signin-button"
        >
          Google Sign In
        </button>

        <p className="login-note">Sign in with your BIT account</p>
      </div>
    </div>
  );
}
