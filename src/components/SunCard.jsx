import React from "react";
import { formatTime } from "../utils/weatherCodes";

function SunCard({ weather }) {
  return (
    <section className="card sun-card">
      <h3>Sunrise & Sunset</h3>
      <div className="sun-arc"><div className="mini-sun">☀️</div></div>
      <div className="sun-times">
        <div><span>🌅</span><strong>{formatTime(weather.daily.sunrise[0])}</strong></div>
        <div><span>🌇</span><strong>{formatTime(weather.daily.sunset[0])}</strong></div>
      </div>
    </section>
  );
}

export default SunCard;
