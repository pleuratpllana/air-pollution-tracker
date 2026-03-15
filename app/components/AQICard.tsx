"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { AQIData } from "../types/aqi";
import { useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Props {
  city: string;
  data: AQIData | null;
  loading: boolean;
  prevAQI?: number | null;
}

export default function AQICard({ city, data, loading, prevAQI }: Props) {
  const [flash, setFlash] = useState(false);
  const [barFlash, setBarFlash] = useState(false);
  const [chartTextColor, setChartTextColor] = useState(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--color-text-primary",
    ) || "#1d1d1f",
  );

  // Flash effect when AQI changes
  useEffect(() => {
    if (!data) return;
    if (prevAQI != null && prevAQI !== data.aqi) {
      setFlash(true);
      setBarFlash(true);
      const timer = setTimeout(() => setFlash(false), 700);
      const barTimer = setTimeout(() => setBarFlash(false), 700);
      return () => {
        clearTimeout(timer);
        clearTimeout(barTimer);
      };
    }
  }, [data?.aqi, prevAQI]);

  // Update chart text color when theme changes
  useEffect(() => {
    const updateColor = () => {
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-text-primary")
        .trim();
      setChartTextColor(color || "#1d1d1f");
    };

    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  if (loading && !data)
    return (
      <div className="glass-card p-4 animate-pulse">Loading air quality...</div>
    );

  if (!data) return <div className="glass-card p-4">Data unavailable</div>;

  // Keep AQI chart colors classic
  const getColor = (v: number) => {
    if (v <= 50) return "#22c55e"; // green
    if (v <= 100) return "#eab308"; // yellow
    if (v <= 150) return "#f97316"; // orange
    return "#ef4444"; // red
  };

  const pillStyle = {
    backgroundColor: "var(--color-pill-bg)",
    color: "var(--color-pill-text)",
    borderColor: "var(--color-card-border)",
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    transition: "all 0.3s ease",
  };

  const pm25 = data.forecast?.pm25 || [];
  const pm10 = data.forecast?.pm10 || [];

  const labels = pm25
    .slice(0, 7)
    .map((d) =>
      new Date(d.day).toLocaleDateString("en-US", { weekday: "short" }),
    );

  const pm25Values = pm25.slice(0, 7).map((d) => d.avg);
  const pm10Values = pm10.slice(0, 7).map((d) => d.avg);

  const chartData = {
    labels,
    datasets: [
      {
        label: "PM2.5",
        data: pm25Values,
        backgroundColor: barFlash
          ? pm25Values.map(() => "var(--color-pill-bg)")
          : pm25Values.map(getColor),
      },
      {
        label: "PM10",
        data: pm10Values,
        backgroundColor: barFlash
          ? pm10Values.map(() => "var(--color-pill-bg)")
          : pm10Values.map(getColor),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    animation: { duration: 600 },
    plugins: {
      legend: {
        position: "top" as const,
        labels: { color: chartTextColor },
      },
    },
    scales: {
      x: { ticks: { color: chartTextColor } },
      y: { ticks: { color: chartTextColor } },
    },
  };

  return (
    <div className="glass-card p-4 w-full transition-colors duration-500 ease-in-out relative">
      {data.updated && (
        <p
          className="text-xs opacity-60 absolute top-5 right-3 transition-colors duration-500 ease-in-out"
          style={{ color: "var(--color-text-primary)" }}
        >
          Updated {new Date(data.updated).toLocaleTimeString()}
        </p>
      )}

      <h2
        className="text-lg font-semibold mb-2 transition-colors duration-500 ease-in-out"
        style={{ color: "var(--color-text-primary)" }}
      >
        {city}
      </h2>

      <div className="flex gap-2 mb-4">
        <span
          style={pillStyle}
          className="transition-colors duration-500 ease-in-out"
        >
          AQI: {data.aqi}
        </span>
        <span
          style={pillStyle}
          className="transition-colors duration-500 ease-in-out"
        >
          Dominant: {data.dominant}
        </span>
      </div>

      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
