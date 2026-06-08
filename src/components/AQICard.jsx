import React from "react";

function getAqiLabel(aqi) {
  if (!aqi && aqi !== 0) return "Unknown";
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy";
  return "Very Unhealthy";
}

function AQICard({ air }) {
  const aqi = air?.us_aqi ?? 72;
  return (
    <section className="card aqi-card">
      <h3>Air Quality Index</h3>
      <div className="gauge">
        <div className="gauge-arc"></div>
        <div className="gauge-center">
          <strong>{aqi}</strong>
          <span>{getAqiLabel(aqi)}</span>
        </div>
      </div>
      <p>PM2.5: {air?.pm2_5 ? Math.round(air.pm2_5) : 28} μg/m³</p>
    </section>
  );
}

export default AQICard;
