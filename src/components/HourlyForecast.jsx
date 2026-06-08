import React from "react";
import { ChevronRight } from "lucide-react";

function HourlyForecast({ hourly, temp, unit }) {
  return (
    <section className="card hourly-card">
      <div className="section-head">
        <h3>Hourly Forecast</h3>
        <button>View More <ChevronRight size={16} /></button>
      </div>

      <div className="hourly-list">
        {hourly.map((item, index) => (
          <div className="hour-item" key={index}>
            <span>{item.time}</span>
            <b>{item.icon}</b>
            <strong>{temp(item.temp)}{unit}</strong>
            <small>💧 {item.rain}%</small>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HourlyForecast;
