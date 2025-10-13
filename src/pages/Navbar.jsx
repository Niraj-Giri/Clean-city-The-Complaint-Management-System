import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ menuOpen, setMenuOpen, userName, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation(); // <--- Get current URL path

  const isActive = (path) => location.pathname === path;

  return (
    <header className="topbar">
      <div className="topbar-inner container">
        <div className="brand" onClick={() => navigate("/home")}>
          🌿 <span>CleanCity</span>
        </div>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {menuOpen && (
            <button
              className="close-menu-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close Menu"
            >
              ×
            </button>
          )}
          <a
            className={`nav-item ${isActive("/home") ? "active" : ""}`}
            onClick={() => navigate("/home")}
          >
            Home
          </a>
          <a
            className={`nav-item ${isActive("/my-complaints") ? "active" : ""}`}
            onClick={() => navigate("/my-complaints")}
          >
            My Complaints
          </a>
          <a
            className={`nav-item ${isActive("/complaint") ? "active" : ""}`}
            onClick={() => navigate("/complaint")}
          >
            Report
          </a>
          <a
            className={`nav-item ${isActive("/insights") ? "active" : ""}`}
            onClick={() => navigate("/insights")}
          >
            Insights
          </a>
          <a
            className={`nav-item ${isActive("/profile") ? "active" : ""}`}
            onClick={() => navigate("/profile")}
          >
            Profile
          </a>
          <a
            className={`nav-item ${isActive("/help") ? "active" : ""}`}
            onClick={() => navigate("/help")}
          >
            Help
          </a>
        </nav>

        <div className="top-actions">
          <button className="icon-btn" title="Notifications">
            🔔
          </button>
          <div className="avatar-wrap">
            <img
              src="https://cdn-icons-png.flaticon.com/512/219/219986.png"
              alt="avatar"
              className="avatar"
              onClick={() => navigate("/profile")}
            />
            <div className="avatar-menu">
              <button onClick={() => navigate("/profile")}>Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label="menu"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
