import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="sidebar">
      <button
        className={`menu-button ${
          location.pathname === "/app/swipe" ? "active" : ""
        }`}
        onClick={() => navigate("/app/swipe")}
      >
        Cats Selection
      </button>

      <button
        className={`menu-button ${
          location.pathname === "/app/liked" ? "active" : ""
        }`}
        onClick={() => navigate("/app/liked")}
      >
        Liked Cats
      </button>
    </div>
  );
}