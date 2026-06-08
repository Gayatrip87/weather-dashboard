export const weatherCodes = {
  0: { text: "Clear Sky", icon: "☀️", mood: "clear" },
  1: { text: "Mainly Clear", icon: "🌤️", mood: "clear" },
  2: { text: "Partly Cloudy", icon: "⛅", mood: "cloudy" },
  3: { text: "Overcast", icon: "☁️", mood: "cloudy" },
  45: { text: "Fog", icon: "🌫️", mood: "cloudy" },
  48: { text: "Fog", icon: "🌫️", mood: "cloudy" },
  51: { text: "Light Drizzle", icon: "🌦️", mood: "rain" },
  53: { text: "Drizzle", icon: "🌧️", mood: "rain" },
  55: { text: "Heavy Drizzle", icon: "🌧️", mood: "rain" },
  61: { text: "Light Rain", icon: "🌦️", mood: "rain" },
  63: { text: "Rain", icon: "🌧️", mood: "rain" },
  65: { text: "Heavy Rain", icon: "⛈️", mood: "rain" },
  71: { text: "Light Snow", icon: "🌨️", mood: "snow" },
  73: { text: "Snow", icon: "❄️", mood: "snow" },
  75: { text: "Heavy Snow", icon: "❄️", mood: "snow" },
  80: { text: "Rain Showers", icon: "🌦️", mood: "rain" },
  81: { text: "Rain Showers", icon: "🌧️", mood: "rain" },
  82: { text: "Heavy Showers", icon: "⛈️", mood: "storm" },
  95: { text: "Thunderstorm", icon: "⛈️", mood: "storm" }
};

export function getWeatherInfo(code) {
  return weatherCodes[code] || { text: "Weather", icon: "🌤️", mood: "clear" };
}

export function formatDay(value) {
  return new Date(value).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric"
  });
}

export function formatTime(value) {
  return new Date(value).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
