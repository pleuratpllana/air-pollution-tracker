"use client";

import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

interface ThemeToggleProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full flex items-center justify-center transition-all hover:opacity-90"
      style={{
        backgroundColor: "var(--button-bg)",
        color: "var(--button-text)",
        border: "1px solid var(--card-border)",
      }}
    >
      {theme === "light" ? (
        <MoonIcon className="w-4 h-4" />
      ) : (
        <SunIcon className="w-4 h-4" />
      )}
    </button>
  );
}
