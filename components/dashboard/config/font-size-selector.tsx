"use client";

import { useThemeConfigStore } from "@/stores/theme-config-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { fontSizes } from "@/constants/config";

export function FontSizeSelector() {
  const { config, updateConfig } = useThemeConfigStore();

  return (
    <Card className="max-w-5xl mx-auto bg-transparent dark:bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle>Tamaño de Fuente</CardTitle>
        <CardDescription>
          Ajusta el tamaño del texto para mejor legibilidad
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4 justify-start">
        {fontSizes.map((size) => (
          <button
            key={size.value}
            onClick={() => updateConfig({ fontSize: size.value as any })}
            className={cn(
              "min-w-[240px] xl:max-w-[calc(33.333%-1rem)] flex-1 basis-[calc(33.333%-1rem)] border rounded-lg px-4 py-3 text-left transition-all",
              config.fontSize === size.value
                ? "border-primary bg-primary/10"
                : "border-muted hover:border-foreground"
            )}
          >
            <div className={cn("font-medium", size.size)}>Aa</div>
            <div className="text-sm font-semibold">{size.label}</div>
            <div className="text-xs text-muted-foreground">
              {size.description}
            </div>
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
