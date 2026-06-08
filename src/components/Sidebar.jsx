import React from "react";
import {
  Bell,
  ChartNoAxesCombined,
  CloudSun,
  Heart,
  Home,
  MapPin,
  Search,
  Settings
} from "lucide-react";

function Sidebar() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <aside className="sidebar">
      <div className="logo-box" onClick={() => scrollToSection("top")}>
        <CloudSun size={28} />
      </div>

      <nav className="side-nav">
        <button title="Home" onClick={() => scrollToSection("top")} className="active">
          <Home />
        </button>

        <button title="Search" onClick={() => scrollToSection("search")}>
          <Search />
        </button>

        <button title="Map" onClick={() => scrollToSection("map")}>
          <MapPin />
        </button>

        <button title="Favorites" onClick={() => scrollToSection("favorites")}>
          <Heart />
        </button>

        <button title="Charts" onClick={() => scrollToSection("charts")}>
          <ChartNoAxesCombined />
        </button>

        <button title="Forecast" onClick={() => scrollToSection("forecast")}>
          <Bell />
        </button>

        <button title="Settings" onClick={() => scrollToSection("top")}>
          <Settings />
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
