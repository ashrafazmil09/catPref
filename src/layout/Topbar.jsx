import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function TopBar() {
  return (
    <div className="topbar">
      <Link to="/" className="logo" style={{ textDecoration: "none", color: "white" }}>
        CatPref 🐾
      </Link>
    </div>
  );
}