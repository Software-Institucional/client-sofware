"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fonts } from "@/constants/config";
import { useThemeConfigStore } from "@/stores/theme-config-store";
import { cn } from "@/lib/utils";

export function FontSelect() {
  const { config, updateConfig } = useThemeConfigStore();

  return (
    <Card className="max-w-5xl mx-auto bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle>Tipografía</CardTitle>
        <CardDescription className="max-w-4xl">
          Selecciona la fuente para la interfaz
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {fonts.map((font) => (
            <button
              key={font.value}
              onClick={() => updateConfig({ font: font.value as any })}
              className={cn(
                "px-4 py-2 rounded-md border border-border text-sm transition-all cursor-pointer",
                font.class,
                config.font === font.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted text-muted-foreground hover:border-primary"
              )}
            >
              {font.label}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
