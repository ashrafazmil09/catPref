import React, { useEffect, useState, useRef } from "react";
import "../App.css";
import { fetchAndPreloadCats } from "../api/cats";

export default function SwipePage() {
  const [cats, setCats] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(null);

  const [likedCats, setLikedCats] = useState(
    JSON.parse(localStorage.getItem("likedCats")) || []
  );

  const [sessionLikes, setSessionLikes] = useState([]);

  const [drag, setDrag] = useState({
    x: 0,
    y: 0,
    isDragging: false,
    startX: 0,
    startY: 0,
  });

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    (async () => {
      try {
        const fullyLoadedCats = await fetchAndPreloadCats(10);
        setCats(fullyLoadedCats);
      } catch (err) {
        setCats([]);
      }
    })();
  }, []);

  const handleRefetch = async () => {
    setCats(null);
    setCurrentIndex(0);
    setSlideDirection(null);
    setSessionLikes([]);
    
    try {
      const freshCats = await fetchAndPreloadCats(10);
      setCats(freshCats);
    } catch (err) {
      setCats([]);
    }
  };

  const handleDragStart = (e) => {
    e.preventDefault();
    const x = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const y = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;
    setDrag({ x: 0, y: 0, isDragging: true, startX: x, startY: y });
  };

  const handleDragMove = (e) => {
    if (!drag.isDragging) return;
    const x = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const y = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;
    setDrag((prev) => ({ ...prev, x: x - prev.startX, y: y - prev.startY }));
  };

  const handleDragEnd = () => {
    if (!drag.isDragging) return;
    const threshold = 120;
    if (drag.x > threshold) handleAction(true);
    else if (drag.x < -threshold) handleAction(false);
    else setDrag({ x: 0, y: 0, isDragging: false, startX: 0, startY: 0 });
  };

  const handleAction = (like) => {
    if (slideDirection || !cats) return;
    
    if (like) {
      const likedCatUrl = cats[currentIndex];
      
      setLikedCats((prev) => {
        const updatedHistory = [...prev, likedCatUrl];
        localStorage.setItem("likedCats", JSON.stringify(updatedHistory));
        return updatedHistory;
      });

      setSessionLikes((prev) => [...prev, likedCatUrl]);
      
      setSlideDirection("right");
    } else {
      setSlideDirection("left");
    }

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setSlideDirection(null);
      setDrag({ x: 0, y: 0, isDragging: false, startX: 0, startY: 0 });
    }, 300);
  };
  const topImgRef = useRef(null);

  useEffect(() => {
    const img = topImgRef.current;
    if (!img) return;

    const start = (e) => {
      e.preventDefault();
      handleDragStart(e);
    };

    img.addEventListener("touchstart", start, { passive: false });
    img.addEventListener("touchmove", handleDragMove, { passive: false });
    img.addEventListener("touchend", handleDragEnd);

    return () => {
      img.removeEventListener("touchstart", start);
      img.removeEventListener("touchmove", handleDragMove);
      img.removeEventListener("touchend", handleDragEnd);
    };
  }, [handleDragStart, handleDragMove, handleDragEnd]);

  if (!cats) {
    return (
      <div className="loading-screen">
        <h2>Preparing Cats...</h2>
      </div>
    );
  }

  if (currentIndex >= cats.length)
    return (
      <div className="swipe-container results-container">
        <h2>Cats You Liked</h2>
        {sessionLikes.length === 0 ? (
          <p>You didn't like any cats this time!</p>
        ) : (
          <div className="liked-cats-grid">
            {sessionLikes.map((catUrl) => (
              <img
                key={catUrl}
                src={catUrl}
                alt="liked cat"
                className="liked-thumb"
              />
            ))}
          </div>
        )}
        <button className="arrow-button like" onClick={handleRefetch}>
          See more cats!
        </button>
      </div>
    );

  return (
    <div className={`swipe-container ${cats ? "fade-in" : ""}`}>
      <h2>Swipe Cats</h2>
      <div className="cat-stack-wrapper">
        {cats.slice(currentIndex).map((cat, idx) => {
          const isTop = idx === 0;
          let transform;
          if (isTop && drag.isDragging)
            transform = `translate(${drag.x}px, ${drag.y}px) rotate(${drag.x * 0.1}deg)`;
          else if (isTop && slideDirection === "right")
            transform = "translateX(500px) rotate(20deg)";
          else if (isTop && slideDirection === "left")
            transform = "translateX(-500px) rotate(-20deg)";

          return (
            <img
              ref={isTop ? topImgRef : null}
              key={cat}
              src={cat}
              alt="cat"
              className="cat-card"
              style={{
                zIndex: cats.length - idx,
                transform,
                opacity: isTop && slideDirection ? 0 : 1,
                transition: drag.isDragging ? "none" : "all 0.3s ease",
              }}
              onMouseDown={isTop ? handleDragStart : null}
              onMouseMove={isTop ? handleDragMove : null}
              onMouseUp={isTop ? handleDragEnd : null}
              onMouseLeave={isTop ? handleDragEnd : null}
            />
          );
        })}
      </div>
      <div className="action-buttons">
        <button className="arrow-button" onClick={() => handleAction(false)}>
          ❌
        </button>
        <button className="arrow-button like" onClick={() => handleAction(true)}>
          ❤️
        </button>
      </div>
    </div>
  );
}