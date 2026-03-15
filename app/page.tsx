"use client";

import { useState } from "react";
import { cityMapping } from "./lib/cityMapping";
import AQICard from "./components/AQICard";
import { useAQIData } from "./hooks/useAQIData";
import { useTheme } from "./context/themeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import FilterTabs from "./components/FilterTabs";
import { AQIData } from "./types/aqi";

export default function Home() {
  const { data, loading, prevDataRef } = useAQIData();
  const cities = Object.keys(cityMapping);
  const { theme, toggleTheme } = useTheme();
  const [search, setSearch] = useState("");
  const [filterTab, setFilterTab] = useState<"all" | "most" | "least">("all");

  // ------------------- Type guard -------------------
  function isAQIData(d: any): d is AQIData {
    return d && typeof d.aqi === "number";
  }

  const normalize = (str: string) =>
    str
      .toLowerCase()
      .replace(/\s+/g, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const citiesWithData = cities.filter((cityKey) => isAQIData(data[cityKey]));

  const filteredCities = search
    ? citiesWithData.filter((cityKey) =>
        normalize(cityMapping[cityKey]).includes(normalize(search)),
      )
    : ["prishtina", "prizren", "peja", "ferizaj", "mitrovice", "gjilan"].filter(
        (cityKey) => isAQIData(data[cityKey]),
      );

  // ------------------- Sorting with type guard -------------------
  let displayedCities = filteredCities;
  if (filterTab === "most")
    displayedCities = [...filteredCities].sort((a, b) => {
      const aAQI = isAQIData(data[a]) ? data[a].aqi : -1;
      const bAQI = isAQIData(data[b]) ? data[b].aqi : -1;
      return bAQI - aAQI;
    });
  else if (filterTab === "least")
    displayedCities = [...filteredCities].sort((a, b) => {
      const aAQI = isAQIData(data[a]) ? data[a].aqi : Infinity;
      const bAQI = isAQIData(data[b]) ? data[b].aqi : Infinity;
      return aAQI - bAQI;
    });

  const noCityFound = filteredCities.length === 0;

  return (
    <div className="relative min-h-[100vh] flex flex-col justify-center items-center overflow-x-hidden py-10 px-4 md:px-8">
      {/* Background video */}
      <video
  className="absolute top-0 left-0 w-full h-full object-cover subtle-blur"
  autoPlay
  loop
  muted
  playsInline
  src="/toxic-smoke.mp4"
/>
      <div className="absolute top-0 left-0 w-full h-full bg-black/80"></div>

      <main className="relative z-10 w-full max-w-[1200px] flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full mb-4 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center sm:text-left">
            Kosovo Air Quality
          </h1>
          <div className="flex flex-row items-center gap-2 justify-center sm:justify-start w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-full focus:outline-none text-sm sm:text-base w-full sm:w-auto"
            />
            <button
              onClick={toggleTheme}
              className="p-3 rounded-full flex items-center justify-center hover:opacity-90 transition-all"
            >
              {theme === "light" ? <MoonIcon className="w-4 h-4" /> : <SunIcon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="w-full sm:w-auto mb-6">
          <FilterTabs selected={filterTab} onSelect={setFilterTab} />
        </div>

        {/* AQI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full justify-items-center">
  {noCityFound ? (
    <p className="text-white text-center w-full col-span-full">
      Sorry, that city is not supported by the API.
    </p>
  ) : (
    displayedCities.map((cityKey) => {
      const cityData = isAQIData(data[cityKey]) ? data[cityKey] : null;
      const prevAQI = isAQIData(prevDataRef.current[cityKey])
        ? prevDataRef.current[cityKey].aqi
        : null;

      return (
        <AQICard
          key={cityKey}
          city={cityMapping[cityKey]}
          data={cityData}
          loading={loading}
          prevAQI={prevAQI}
        />
      );
    })
  )}
</div>

{/* AQI explanation */}
<p className="mt-4 text-xs text-center text-white">
  AQI (Air Quality Index) measures how clean or polluted the air is. The “Dominant” pollutant shows which substance, like PM2.5 or O3, contributes most to the air quality level.
</p>
      </main>
    </div>
  );
}