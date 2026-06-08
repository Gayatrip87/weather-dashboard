import React, { useState } from "react";
import { ChevronRight, X } from "lucide-react";

function WeatherMap({ place }) {
  const [open, setOpen] = useState(false);
  const query = encodeURIComponent(`${place?.name || "Pune"} ${place?.country || "India"}`);

  return (
    <>
      <section className="card map-card">
        <div className="section-head">
          <h3>Weather Map</h3>
          <button onClick={() => setOpen(true)}>
            View Full Map <ChevronRight size={16} />
          </button>
        </div>

        <div className="india-map" onClick={() => setOpen(true)}>
          <div className="map-grid"></div>
          <span className="map-title">India</span>
          <span className="city-dot pune">● {place?.name || "Pune"}</span>
          <span className="city-dot mumbai">● Mumbai</span>
          <span className="city-dot delhi">● Delhi</span>
          <span className="city-dot bengaluru">● Bengaluru</span>

          <div className="zoom-control">
            <button onClick={(e) => e.stopPropagation()}>+</button>
            <button onClick={(e) => e.stopPropagation()}>-</button>
          </div>

          <p className="map-help">Click map to open full map</p>
        </div>
      </section>

      {open && (
        <div className="map-modal">
          <div className="map-modal-content">
            <div className="map-modal-header">
              <h2>{place?.name || "Weather"} Map</h2>
              <button onClick={() => setOpen(false)}><X /></button>
            </div>

            <iframe
              title="OpenStreetMap"
              src="https://www.openstreetmap.org/export/embed.html?bbox=68.0,6.0,98.0,37.5&layer=mapnik&marker=18.5204,73.8567"
              loading="lazy"
            ></iframe>

            <a
              className="open-map-link"
              href={`https://www.openstreetmap.org/search?query=${query}`}
              target="_blank"
              rel="noreferrer"
            >
              Open exact city in browser
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default WeatherMap;
