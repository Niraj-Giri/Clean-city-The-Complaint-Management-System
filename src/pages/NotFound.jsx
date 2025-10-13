import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Oops! Page Not Found</h2>
        <p className="notfound-text">
          The page you're looking for doesn’t exist or has been moved.  
          Let’s get you back to keeping your city clean 🌿
        </p>
        <button className="notfound-btn" onClick={() => navigate("/home")}>
          ⬅️ Go Back Home
        </button>
      </div>

      <div className="notfound-illustration">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6194/6194029.png"
          alt="city illustration"
        />
      </div>
    </div>
  );
}
