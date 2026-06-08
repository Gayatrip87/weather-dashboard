import React from "react";

function LiveBackground({ mood, dark }) {
  return (
    <div className={`live-bg ${mood} ${dark ? "night" : "day"}`}>
      <div className="live-sun"></div>
      <div className="live-moon"></div>

      <div className="stars-layer"></div>

      <div className="cloud cloud-a"></div>
      <div className="cloud cloud-b"></div>
      <div className="cloud cloud-c"></div>

      <div className="rain-layer">
        {Array.from({ length: 70 }).map((_, index) => (
          <span key={index} style={{ left: `${(index * 13) % 100}%`, animationDelay: `${(index % 9) * 0.13}s` }}></span>
        ))}
      </div>

      <div className="snow-layer">
        {Array.from({ length: 45 }).map((_, index) => (
          <span key={index} style={{ left: `${(index * 17) % 100}%`, animationDelay: `${(index % 12) * 0.22}s` }}></span>
        ))}
      </div>
    </div>
  );
}

export default LiveBackground;
