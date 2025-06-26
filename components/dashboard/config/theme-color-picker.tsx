"use client";

import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { colorSchemes } from "@/constants/config";
import { useThemeConfigStore } from "@/stores/theme-config-store";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ThemeColorPicker() {
  const { config, updateConfig } = useThemeConfigStore();

  const handleColorSchemeChange = (colorScheme: any) => {
    updateConfig({ colorScheme });
  };

  return (
    <Card className="max-w-5xl mx-auto bg-transparent dark:bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle>Esquema de Colores</CardTitle>
        <CardDescription className="max-w-4xl">
          Personaliza los colores principales de la interfaz. Los cambios se
          reflejan inmediatamente en toda la aplicación.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          {colorSchemes.map((scheme) => {
            const isSelected = config.colorScheme === scheme.value;

            return (
              <motion.button
                key={scheme.value}
                onClick={() => handleColorSchemeChange(scheme.value)}
                className={cn(
                  "relative w-10 h-10 rounded-full border-4 transition-all duration-200 cursor-pointer",
                  isSelected
                    ? "border-white shadow-lg scale-110"
                    : "border-transparent hover:border-primary/30 hover:scale-105"
                )}
                style={{ backgroundColor: scheme.bg }}
                whileHover={{ scale: isSelected ? 1.1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={scheme.label}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 rounded-full border-4 border-primary"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Color Labels */}
        <div className="mt-4 flex flex-wrap gap-2">
          {colorSchemes.map((scheme) => {
            const isSelected = config.colorScheme === scheme.value;
            return (
              <Badge
                key={scheme.value}
                variant={isSelected ? "default" : "secondary"}
                className="text-xs"
              >
                {scheme.label}
              </Badge>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
