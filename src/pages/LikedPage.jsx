import React, { useState, useEffect } from "react";
import "../App.css";

export default function LikedPage() {
  const [likedCats, setLikedCats] = useState([]);

  const loadLikedCats = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("likedCats")) || [];
      setLikedCats(stored);
    } catch (err) {
      console.error("Failed to read likedCats from localStorage", err);
      setLikedCats([]);
    }
  };

  useEffect(() => {
    loadLikedCats();

    const handleStorageChange = (e) => {
      if (e.key === "likedCats") {
        loadLikedCats();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const clearLikedCats = () => {
    localStorage.removeItem("likedCats");
    setLikedCats([]);
  };

  return (
    <div className="swipe-container">
      <h2>Liked Cats</h2>

      {likedCats.length === 0 ? (
        <p>You haven't liked any cats yet.</p>
      ) : (
        <>
          <p>You liked {likedCats.length} cats:</p>

          <button className="arrow-button like" onClick={clearLikedCats}>
            🗑 Clear Liked Cats
          </button>

          <div className="liked-cats-grid">
            {likedCats.map((catUrl, index) => (
              <img
                key={`${catUrl}-${index}`}
                src={catUrl}
                alt="liked cat"
                className="liked-thumb"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}