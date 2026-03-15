"use client";

import { useEffect, useState } from "react";

type TabKey = "all" | "most" | "least";

interface FilterTabsProps {
  selected: TabKey;
  onSelect: (tab: TabKey) => void;
}

export default function FilterTabs({ selected, onSelect }: FilterTabsProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const currentTheme = (document.documentElement.getAttribute("data-theme") as "light" | "dark") || "light";
    setTheme(currentTheme);

    const observer = new MutationObserver(() => {
      const newTheme = (document.documentElement.getAttribute("data-theme") as "light" | "dark") || "light";
      setTheme(newTheme);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const tabs: { key: TabKey; label: string }[] = [
    { key: "all", label: "All" },
    { key: "most", label: "Most Polluted" },
    { key: "least", label: "Least Polluted" },
  ];

  return (
    <div
      className="pill-tabs-container"
      style={{
        backgroundColor: theme === "light" ? "var(--color-card-bg)" : "transparent",
      }}
    >
      {tabs.map((tab) => {
        const isSelected = selected === tab.key;

        let bgColor = "transparent";
        let textColor = theme === "light" ? "var(--color-text-primary)" : "#ffffff";

        if (isSelected) {
          if (theme === "light") {
            bgColor = "var(--color-text-primary)"; // dark background
            textColor = "#ffffff"; // white text
          } else {
            bgColor = "#ffffff"; // white background
            textColor = "#000000"; // black text
          }
        }

        return (
          <button
            key={tab.key}
            onClick={() => onSelect(tab.key)}
            className="pill-button"
            style={{
              backgroundColor: bgColor,
              color: textColor,
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}