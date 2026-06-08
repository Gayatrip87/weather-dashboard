import React from "react";
import { CalendarDays, Clock, Droplets, Eye, Gauge, Sun, Wind } from "lucide-react";
import { formatTime, getWeatherInfo } from "../utils/weatherCodes";

function HeroWeather({ weather, place, unit, temp }) {
  const info = getWeatherInfo(weather.current.weather_code);
  const today = new Date().toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <section className="hero-card card">
      <div className="hero-bg">
        <div className="moon"></div>
        <div className="mountains"></div>
      </div>

      <div className="hero-main">
        <div>
          <h2>{place.name}{place.country ? `, ${place.country}` : ""}</h2>
          <div className="main-temp">{temp(weather.current.temperature_2m)}{unit}</div>
          <p className="condition"><span>{info.icon}</span>{info.text}</p>
          <p className="feels">Feels like {temp(weather.current.apparent_temperature)}{unit}</p>

          <div className="date-row">
            <span><CalendarDays size={17} /> {today}</span>
            <span><Clock size={17} /> {formatTime(weather.current.time)}</span>
          </div>
        </div>

        <div className="hero-stats">
          <div><Droplets /><span>Humidity</span><strong>{weather.current.relative_humidity_2m}%</strong></div>
          <div><Wind /><span>Wind</span><strong>{weather.current.wind_speed_10m} km/h</strong></div>
          <div><Gauge /><span>Pressure</span><strong>{Math.round(weather.current.pressure_msl)} hPa</strong></div>
          <div><Eye /><span>Visibility</span><strong>{Math.round(weather.current.visibility / 1000)} km</strong></div>
          <div><Sun /><span>UV Index</span><strong>{weather.daily.uv_index_max[0]}</strong></div>
        </div>
      </div>
    </section>
  );
}

export default HeroWeather;
