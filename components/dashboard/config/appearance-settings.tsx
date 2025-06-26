"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { themeOptions } from "@/constants/config";

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  const PreviewWindow = ({ type }: { type: string }) => {
    const isDark = type === "dark";
    const isLight = type === "light";

    return (
      <div
        className={cn(
          "relative w-full h-24 rounded-lg border-2 overflow-hidden",
          isDark
            ? "bg-gray-900 border-gray-700"
            : isLight
            ? "bg-white border-gray-200"
            : "bg-gradient-to-r from-gray-900 via-gray-600 to-white border-gray-400"
        )}
      >
        {/* Window controls */}
        <div
          className={cn(
            "flex items-center gap-1.5 p-2 border-b",
            isDark
              ? "border-gray-700 bg-gray-800"
              : isLight
              ? "border-gray-200 bg-gray-50"
              : "border-gray-500 bg-gray-700"
          )}
        >
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
        </div>

        {/* Content area */}
        <div className="p-2 space-y-1">
          <div
            className={cn(
              "h-2 rounded",
              isDark ? "bg-gray-700" : isLight ? "bg-gray-200" : "bg-gray-600"
            )}
            style={{ width: "80%" }}
          ></div>
          <div
            className={cn(
              "h-2 rounded",
              isDark ? "bg-gray-600" : isLight ? "bg-gray-300" : "bg-gray-500"
            )}
            style={{ width: "60%" }}
          ></div>
          <div
            className={cn(
              "h-2 rounded",
              isDark ? "bg-gray-700" : isLight ? "bg-gray-200" : "bg-gray-600"
            )}
            style={{ width: "90%" }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <Card className="max-w-5xl mx-auto bg-transparent dark:bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle>Configuración de la apariencia</CardTitle>
        <CardDescription className="max-w-4xl">
          Elige el aspecto que prefieras para la interfaz. Tienes la opción de
          elegir un tema manualmente o activar el cambio automático de tema en
          función de la configuración del sistema.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-4 justify-start">
          {themeOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = theme === option.value;

            return (
              <motion.div
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative xl:max-w-[calc(33.333%-1rem)] min-w-[260px] flex-1 basis-[calc(33.333%-1rem)]"
              >
                <button
                  onClick={() => setTheme(option.value)}
                  className={cn(
                    "w-full min-h-full p-4 rounded-xl border-2 transition-all duration-200 text-left",
                    isSelected
                      ? "border-primary bg-primary/5 dark:bg-primary/10"
                      : "border-border hover:border-primary/40 hover:bg-primary/5"
                  )}
                >
                  {/* Preview Window */}
                  <div className="mb-4">
                    <PreviewWindow type={option.preview} />
                  </div>

                  {/* Theme Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon
                        className={cn(
                          "size-4",
                          isSelected ? "text-primary" : "text-muted-foreground"
                        )}
                      />
                      <div className="flex items-center flex-wrap gap-2">
                        <span className="font-medium text-sm">
                          {option.label}
                        </span>
                        {option.subtitle && (
                          <span
                            className={cn(
                              "text-xs px-2 py-0.5 rounded-full",
                              isSelected
                                ? "bg-primary text-primary-foreground font-medium"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {option.subtitle}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {option.description}
                    </p>
                  </div>

                  {/* Selection indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                    >
                      <Check className="size-3 text-white" />
                    </motion.div>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="p-1 shrink-0 rounded-full bg-primary/50 dark:bg-primary/80 text-primary-foreground flex items-center justify-center mt-0.5">
              <Info className="size-5" />
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">
                Cambio automático de tema
              </h4>
              <p className="text-xs text-muted-foreground">
                Al utilizar el tema del sistema, la interfaz cambiará
                automáticamente entre los modos claro y oscuro en función de la
                configuración del sistema operativo. Esto proporciona la mejor
                experiencia en diferentes momentos del día y condiciones de
                iluminación.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
