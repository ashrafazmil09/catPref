import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/app/swipe");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="landing-title">🐾 PawsPref! 🐾</h1>
        <p className="landing-subtitle">
          Discover your favorite kitties! Swipe right for like, left for dislike.
        </p>
        <button className="landing-button" onClick={handleStart}>
          Start Swiping
        </button>
      </header>
    </div>
  );
}

export default LandingPage;