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
          <Link to="/about"><a>About</a></Link>
        </li>
        <li>
          <Link to="/tracks"><a>Tracks</a></Link>
        </li>
        <li>
        <Link to="/timeline">
          <a>Timeline</a>
          </Link>
        </li>
        <li>
        <Link to="/faq">
          <a>FAQ'S</a>
          </Link>
        </li>
        <li>
        <Link to="/contact">
          <a>Contact us</a>
          </Link>
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
