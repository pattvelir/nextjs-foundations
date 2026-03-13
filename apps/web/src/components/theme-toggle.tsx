"use client";

import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
    >
      Theme: {theme}
    </button>
  );
}
