import React from "react";
import { ChevronRight } from "lucide-react";
import { formatDay, getWeatherInfo } from "../utils/weatherCodes";

function Forecast7Days({ weather, temp, unit }) {
  return (
    <section className="card forecast-card">
      <div className="section-head">
        <h3>7-Day Forecast</h3>
        <button>View More <ChevronRight size={16} /></button>
      </div>

      <div className="days-list">
        {weather.daily.time.map((day, index) => {
          const info = getWeatherInfo(weather.daily.weather_code[index]);
          return (
            <div className="day-item" key={day}>
              <span>{formatDay(day)}</span>
              <b>{info.icon}</b>
              <strong>{temp(weather.daily.temperature_2m_max[index])}{unit}</strong>
              <small>{temp(weather.daily.temperature_2m_min[index])}{unit}</small>
              <em>💧 {weather.daily.precipitation_probability_max[index]}%</em>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Forecast7Days;
