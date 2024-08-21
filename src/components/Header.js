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
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#track">Tracks</a>
        </li>
        <li>
          <a href="#time">Timeline</a>
        </li>
        <li>
          <a href="#faq">FAQ'S</a>
        </li>
        <li>
          <a href="#contact">Contact us</a>
        </li>
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
