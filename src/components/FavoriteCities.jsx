import React from "react";
import { ChevronRight, Heart } from "lucide-react";

function FavoriteCities({ favorites, onSearch }) {
  const defaultCities = [
    ["Mumbai, India", "29°C", "☁️"],
    ["Delhi, India", "33°C", "☀️"],
    ["Bengaluru, India", "28°C", "☁️"],
    ["Goa, India", "30°C", "☀️"]
  ];

  const list = favorites.length ? favorites.map((item) => [item, "--", "🌤️"]) : defaultCities;

  return (
    <section className="card favorite-card">
      <div className="section-head">
        <h3>Favorite Cities</h3>
        <button>Manage <ChevronRight size={16} /></button>
      </div>

      <div className="favorite-list">
        {list.map(([name, temperature, icon]) => (
          <button className="favorite-row" key={name} onClick={() => onSearch(name.split(",")[0])}>
            <span className="city-avatar">{icon}</span>
            <span>{name}</span>
            <strong>{temperature}</strong>
            <Heart size={18} />
          </button>
        ))}
      </div>
    </section>
  );
}

export default FavoriteCities;
