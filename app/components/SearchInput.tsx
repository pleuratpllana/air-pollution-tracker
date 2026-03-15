"use client";

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <input
      type="text"
      placeholder="Search city..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2 rounded-full text-sm sm:text-base w-full sm:w-auto border transition-all focus:outline-none"
      style={{
        backgroundColor: "var(--input-bg)",
        color: "var(--input-text)",
        borderColor: "var(--card-border)",
      }}
    />
  );
}