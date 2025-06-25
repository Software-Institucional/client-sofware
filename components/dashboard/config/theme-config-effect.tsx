"use client";

import { useEffect } from "react";
import { useThemeConfigStore } from "@/stores/theme-config-store";

export function ApplyThemeClass() {
  const { config } = useThemeConfigStore();

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Change color scheme in <html>
    const themeClasses = [
      "theme-blue",
      "theme-orange",
      "theme-red",
      "theme-pink",
      "theme-violet",
      "theme-green",
      "theme-yellow",
    ];
    root.classList.remove(...themeClasses);
    root.classList.add(`theme-${config.colorScheme}`);

    // Change font in <body>
    const fontClasses = [
      "font-inter",
      "font-system",
      "font-mono",
      "font-poppins",
      "font-rubik",
      "font-outfit",
    ];
    body.classList.remove(...fontClasses);
    body.classList.add(`font-${config.font}`);

    // Change font size
    const fontSizeClasses = ["text-size-sm", "text-size-base", "text-size-lg"];
    root.classList.remove(...fontSizeClasses);
    root.classList.add(`text-size-${config.fontSize}`);
  }, [config.colorScheme, config.font, config.fontSize]);

  return null;
}
