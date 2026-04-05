"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import type { ReactNode } from "react";

type ThemeMode = "light" | "dark" | "system";

const buttonClass =
  "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors";

export default function ThemeToggle() {
  const { mounted, themeMode, setThemeMode } = useTheme();

  if (!mounted) {
    return (
      <div className="inline-flex rounded-lg border border-gray-200 dark:border-[#3e342b] p-1">
        <div className="h-8 w-28 animate-pulse rounded-md bg-gray-100 dark:bg-[#2a221b]" />
      </div>
    );
  }

  const modes: Array<{ label: string; value: ThemeMode; icon: ReactNode }> = [
    { label: "Light", value: "light", icon: <Sun size={14} /> },
    { label: "Dark", value: "dark", icon: <Moon size={14} /> },
    { label: "System", value: "system", icon: <Monitor size={14} /> },
  ];

  return (
    <div className="inline-flex rounded-lg border border-gray-200 dark:border-[#3e342b] p-1 bg-white dark:bg-[#1a140e]">
      {modes.map((mode) => {
        const active = themeMode === mode.value;

        return (
          <button
            key={mode.value}
            type="button"
            onClick={() => setThemeMode(mode.value)}
            className={`${buttonClass} ${
              active
                ? "bg-[#ec6d13] text-white border-[#ec6d13]"
                : "border-transparent text-gray-600 dark:text-[#b9a89d] hover:text-gray-900 dark:hover:text-white"
            }`}
            aria-pressed={active}
          >
            {mode.icon}
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}
