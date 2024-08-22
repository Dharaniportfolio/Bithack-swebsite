import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="header">
      <div className="logo">BitHack's</div>
      <div className="link">
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/tracks">Tracks</Link>
        </li>
        <li>
          <Link to="/timeline">Timeline</Link>
        </li>
        <li>
          <Link to="/faq">FAQ'S</Link>
        </li>
        <li>
          <Link to="/contact">Contact us</Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        )}
        <li>
          {isLoggedIn ? (
            <button className="register" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="register">Login</button>
            </Link>
          )}
        </li>
      </div>
    </nav>
  );
};

export default Header;
