"use client";

import { useEffect, useState, useRef } from "react";
import { cityMapping } from "../lib/cityMapping";
import { AQIData } from "../types/aqi";

export function useAQIData() {
  const cities = Object.keys(cityMapping);

  const [data, setData] = useState<Record<string, AQIData | null>>({});
  const [loading, setLoading] = useState(true);
  const prevDataRef = useRef<Record<string, AQIData | null>>({});

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchCity = async (city: string) => {
      try {
        const res = await fetch(`/api/air-quality?city=${city}`, {
          cache: "no-store",
          signal,
        });
        if (!res.ok) throw new Error("API failed");
        const json = await res.json();
        return [city, json] as [string, AQIData];
      } catch {
        return [city, null] as [string, null];
      }
    };

    const fetchAll = async (initial = false) => {
      if (initial) setLoading(true);

      const results: [string, AQIData | null][] = [];
      for (let i = 0; i < cities.length; i++) {
        const city = cities[i];
        const result = await fetchCity(city);
        results.push(result);
        await new Promise((r) => setTimeout(r, 250)); // stagger requests
      }

      const newData = Object.fromEntries(results);
      prevDataRef.current = data;
      setData((prev) => ({ ...prev, ...newData }));

      if (initial) setLoading(false);
    };

    fetchAll(true);
    const interval = setInterval(() => fetchAll(false), 30000);

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  return { data, loading, prevDataRef };
}
