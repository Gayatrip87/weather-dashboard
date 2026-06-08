import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { formatDay } from "../utils/weatherCodes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend
);

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  },
  layout: {
    padding: {
      right: 20,
      left: 6,
      top: 10,
      bottom: 4
    }
  },
  scales: {
    x: {
      offset: true,
      ticks: {
        color: "rgba(255,255,255,0.85)",
        autoSkip: false,
        maxRotation: 0,
        minRotation: 0
      },
      grid: {
        color: "rgba(255,255,255,0.06)"
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: "rgba(255,255,255,0.85)"
      },
      grid: {
        color: "rgba(255,255,255,0.08)"
      }
    }
  }
};

export function TemperatureChart({ weather }) {
  const labels = weather.daily.time.map((d) => formatDay(d).split(" ")[0]);

  const data = {
    labels,
    datasets: [
      {
        data: weather.daily.temperature_2m_max,
        borderColor: "#facc15",
        backgroundColor: "rgba(250, 204, 21, 0.25)",
        fill: true,
        tension: 0.42,
        pointBackgroundColor: "#facc15",
        pointRadius: 4
      }
    ]
  };

  return (
    <section className="card chart-card">
      <h3>Temperature Trend</h3>
      <div className="chart-box">
        <Line data={data} options={baseOptions} />
      </div>
    </section>
  );
}

export function RainfallChart({ weather }) {
  const labels = weather.daily.time.map((d) => formatDay(d).split(" ")[0]);

  const data = {
    labels,
    datasets: [
      {
        data: weather.daily.precipitation_probability_max,
        backgroundColor: "rgba(59, 130, 246, 0.85)",
        borderColor: "#60a5fa",
        borderWidth: 1,
        borderRadius: 8,
        barPercentage: 0.6,
        categoryPercentage: 0.75
      }
    ]
  };

  const options = {
    ...baseOptions,
    scales: {
      ...baseOptions.scales,
      y: {
        ...baseOptions.scales.y,
        suggestedMax: 100,
        max: 100
      }
    }
  };

  return (
    <section className="card chart-card rainfall-card">
      <h3>Rainfall Trend</h3>
      <div className="chart-box">
        <Bar data={data} options={options} />
      </div>
    </section>
  );
}
