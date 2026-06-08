import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import HeroWeather from "./components/HeroWeather.jsx";
import HourlyForecast from "./components/HourlyForecast.jsx";
import AQICard from "./components/AQICard.jsx";
import SunCard from "./components/SunCard.jsx";
import { RainfallChart, TemperatureChart } from "./components/Charts.jsx";
import Forecast7Days from "./components/Forecast7Days.jsx";
import WeatherMap from "./components/WeatherMap.jsx";
import FavoriteCities from "./components/FavoriteCities.jsx";
import LiveBackground from "./components/LiveBackground.jsx";
import { getWeatherInfo } from "./utils/weatherCodes.js";

function App() {
  const [city, setCity] = useState("Pune");
  const [place, setPlace] = useState(null);
  const [weather, setWeather] = useState(null);
  const [air, setAir] = useState(null);
  const [dark, setDark] = useState(true);
  const [unitType, setUnitType] = useState("C");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem("dashboardFavorites") || "[]")
  );

  useEffect(() => {
    searchWeather("Pune");
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboardFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const unit = unitType === "C" ? "°C" : "°F";

  const temp = (value) => {
    if (value === undefined || value === null) return "--";
    return unitType === "C" ? Math.round(value) : Math.round(value * 9 / 5 + 32);
  };

  const mood = useMemo(() => {
    if (!weather) return "clear";
    return getWeatherInfo(weather.current.weather_code).mood;
  }, [weather]);

  async function loadWeather(latitude, longitude, locationDetails) {
    const forecastUrl =
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl,visibility` +
      `&hourly=temperature_2m,precipitation_probability,weather_code` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max,sunrise,sunset` +
      `&timezone=auto`;

    const airUrl =
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}` +
      `&current=us_aqi,pm2_5,pm10,carbon_monoxide,nitrogen_dioxide`;

    const [forecastRes, airRes] = await Promise.all([fetch(forecastUrl), fetch(airUrl)]);
    const forecastData = await forecastRes.json();
    const airData = await airRes.json();

    setWeather(forecastData);
    setAir(airData.current || null);
    setPlace(locationDetails);
  }

  async function searchWeather(cityName = city) {
    if (!cityName.trim()) {
      setError("Please enter city name.");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
      const geoRes = await fetch(geoUrl);
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("City not found. Try another city.");
        return;
      }

      const result = geoData.results[0];

      await loadWeather(result.latitude, result.longitude, {
        name: result.name,
        country: result.country,
        state: result.admin1 || ""
      });

      setCity(`${result.name}, ${result.country}`);
    } catch {
      setError("Failed to fetch weather. Please check your internet.");
    } finally {
      setLoading(false);
    }
  }

  function myLocationWeather() {
    if (!navigator.geolocation) {
      setError("Location is not supported in this browser.");
      return;
    }

    setError("");
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await loadWeather(position.coords.latitude, position.coords.longitude, {
            name: "My Location",
            country: "",
            state: "Live GPS location"
          });
          setCity("My Location");
        } catch {
          setError("Unable to load current location weather.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
        setError("Location permission denied.");
      }
    );
  }

  function addCurrentToFavorites() {
    if (!place) return;
    const label = `${place.name}${place.country ? ", " + place.country : ""}`;
    setFavorites((old) => (old.includes(label) ? old : [label, ...old].slice(0, 5)));
  }

  const hourly = weather
    ? weather.hourly.time.slice(0, 8).map((time, index) => ({
        time: new Date(time).toLocaleTimeString("en-IN", { hour: "numeric" }),
        temp: weather.hourly.temperature_2m[index],
        rain: weather.hourly.precipitation_probability[index],
        icon: getWeatherInfo(weather.hourly.weather_code[index]).icon
      }))
    : [];

  return (
    <div className={`app-shell ${dark ? "dark" : "light"} ${mood}`}>
      <LiveBackground mood={mood} dark={dark} />
      <Sidebar />

      <main className="dashboard" id="top">
        <div id="search"></div>
        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={() => searchWeather()}
          onLocation={myLocationWeather}
          dark={dark}
          setDark={setDark}
        />

        <button className="unit-btn" onClick={() => setUnitType(unitType === "C" ? "F" : "C")}>
          Change Unit: {unitType === "C" ? "Fahrenheit" : "Celsius"}
        </button>

        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-message">Loading weather...</div>}

        {weather && place && (
          <>
            <HeroWeather weather={weather} place={place} air={air} unit={unit} temp={temp} />

            <div className="main-grid">
              <div className="left-grid">
                <HourlyForecast hourly={hourly} temp={temp} unit={unit} />

                <div className="two-cols" id="charts">
                  <TemperatureChart weather={weather} />
                  <RainfallChart weather={weather} />
                </div>

                <div id="forecast"></div>
                <Forecast7Days weather={weather} temp={temp} unit={unit} />

                <div className="two-cols bottom-grid">
                  <div id="map"></div>
                  <WeatherMap place={place} />
                  <div id="favorites"></div>
                  <FavoriteCities favorites={favorites} onSearch={searchWeather} />
                </div>
              </div>

              <div className="right-grid">
                <AQICard air={air} />
                <SunCard weather={weather} />

                <section className="card smart-card">
                  <h3>Smart Weather Tips</h3>
                  <p>
                    {weather.daily.precipitation_probability_max[0] > 50
                      ? "Carry an umbrella today. Rain chances are high."
                      : "Weather looks suitable for outdoor activities."}
                  </p>
                  <p>
                    {weather.daily.uv_index_max[0] > 6
                      ? "UV index is high. Use sunscreen before going out."
                      : "UV level is normal today."}
                  </p>
                  <button onClick={addCurrentToFavorites}>Add to Favorites</button>
                </section>
              </div>
            </div>
          </>
        )}

        <footer>Data by Open-Meteo • Last updated a few seconds ago</footer>
      </main>
    </div>
  );
}

export default App;
