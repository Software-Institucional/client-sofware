import React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { platformName } from "@/constants";
import { useThemeConfigStore } from "@/stores/theme-config-store";

interface LogoProps {
  column?: boolean;
  showName?: boolean;
  logoClassname?: string;
  labelClassname?: string;
}

// Mapeo de colores para cada esquema
const colorSchemeMap = {
  blue: { light: "#75D8FC", dark: "#0072E5" },
  orange: { light: "#FFB366", dark: "#FF8C00" },
  red: { light: "#FF6B6B", dark: "#E53E3E" },
  pink: { light: "#FF69B4", dark: "#C71585" },
  violet: { light: "#A78BFA", dark: "#7C3AED" },
  green: { light: "#68D391", dark: "#38A169" },
  yellow: { light: "#F6E05E", dark: "#D69E2E" },
};

export function Logo({
  showName,
  column,
  logoClassname,
  labelClassname,
}: LogoProps) {
  const { config } = useThemeConfigStore();
  const colors = colorSchemeMap[config.colorScheme];

  // Función para generar el SVG con colores dinámicos
  const getDynamicLogoSrc = () => {
    const svgContent = `
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 0H16V12.0632C15.9663 14.2434 14.1885 16 12.0005 16H0V24H8.68629C10.808 24 12.8429 23.1571 14.3431 21.6569L21.6569 14.3431C23.1571 12.8429 24 10.808 24 8.68629V0Z" fill="url(#paint0_linear_7697_8782)"></path>
        <path d="M16 40H24V27.9368C24.0337 25.7566 25.8115 24 27.9995 24H40V16H31.3137C29.192 16 27.1571 16.8429 25.6569 18.3431L18.3431 25.6569C16.8429 27.1571 16 29.192 16 31.3137V40Z" fill="url(#paint1_linear_7697_8782)"></path>
        <defs>
          <linearGradient id="paint0_linear_7697_8782" x1="20" y1="-0.997096" x2="20" y2="33.7931" gradientUnits="userSpaceOnUse">
            <stop stop-color="${colors.light}"></stop>
            <stop offset="1" stop-color="${colors.dark}"></stop>
          </linearGradient>
          <linearGradient id="paint1_linear_7697_8782" x1="20" y1="-0.997096" x2="20" y2="33.7931" gradientUnits="userSpaceOnUse">
            <stop stop-color="${colors.light}"></stop>
            <stop offset="1" stop-color="${colors.dark}"></stop>
          </linearGradient>
        </defs>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svgContent)}`;
  };

  return (
    <div className={cn("flex items-center gap-3", column && "flex-col")}>
      <Image
        src={getDynamicLogoSrc()}
        alt="Logo"
        width={40}
        height={40}
        className={cn("h-10 w-auto object-contain", logoClassname)}
      />
      {showName && (
        <span className={cn("text-2xl font-bold", labelClassname)}>
          {platformName}{" "}
        </span>
      )}
    </div>
  );
}
