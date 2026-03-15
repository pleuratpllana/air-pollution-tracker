"use client";

import AQICard from "./AQICard";

interface AQICardGridProps {
  cities: string[];
  cityMapping: Record<string, string>;
  data: Record<string, any>;
  loading: boolean;
  noCityFoundMessage?: string;
}

export default function AQICardGrid({
  cities,
  cityMapping,
  data,
  loading,
  noCityFoundMessage = "Sorry, this city is not supported yet",
}: AQICardGridProps) {
  const noCityFound = cities.length === 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full justify-items-center">
      {noCityFound ? (
        <p
          className="text-center w-full col-span-full"
          style={{ color: "var(--text-primary)" }}
        >
          {noCityFoundMessage}
        </p>
      ) : (
        cities.map((cityKey) => (
          <AQICard
            key={cityKey}
            city={cityMapping[cityKey]}
            data={data[cityKey]}
            loading={loading}
          />
        ))
      )}
    </div>
  );
}
