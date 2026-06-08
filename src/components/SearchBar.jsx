import React from "react";
import { LocateFixed, Moon, Search, Sun } from "lucide-react";

function SearchBar({ city, setCity, onSearch, onLocation, dark, setDark }) {
  return (
    <div className="top-search">
      <div className="search-pill">
        <Search size={24} />
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          placeholder="Search city..."
        />
      </div>

      <button className="location-pill" onClick={onLocation}>
        <LocateFixed size={20} />
        My Location
      </button>

      <button className="theme-pill" onClick={() => setDark(!dark)}>
        {dark ? <Sun size={22} /> : <Moon size={22} />}
        <span>{dark ? "Light" : "Dark"}</span>
      </button>
    </div>
  );
}

export default SearchBar;
