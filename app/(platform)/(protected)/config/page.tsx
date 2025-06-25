"use client";

import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { settingsTabs } from "@/constants/config";
import { AppearanceSettings } from "@/components/dashboard/config/appearance-settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeColorPicker } from "@/components/dashboard/config/theme-color-picker";
import { FontSelect } from "@/components/dashboard/config/font-select";
import { FontSizeSelector } from "@/components/dashboard/config/font-size-selector";
import { Button } from "@/components/ui/button";
import { useThemeConfigStore } from "@/stores/theme-config-store";
import { useTheme } from "next-themes";

export default function ConfigPage() {
  const { setTheme } = useTheme();
  const { resetConfig } = useThemeConfigStore();
  const [activeTab, setActiveTab] = useState("account");

  const handleReset = () => {
    resetConfig();
    setTheme("system");
  };

  return (
    <div className="h-[calc(100vh-theme(spacing.16))] flex flex-col">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="h-full flex flex-col overflow-y-auto lg:overflow-y-hidden"
      >
        <div className="flex flex-col lg:flex-row gap-4 h-full">
          {/* Sidebar Navigation */}
          <div className="lg:w-[320px] xl:w-[330px] flex-shrink-0">
            <Card className="bg-accent dark:bg-accent/30 shadow-none h-full rounded-none border-l-0 border-y-0 border-r">
              <CardHeader>
                <CardTitle className="text-lg">Configuración</CardTitle>
                <CardDescription>
                  Selecciona una categoría para configurar
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 flex-1 overflow-y-auto">
                <TabsList className="grid w-full grid-cols-1 h-auto bg-transparent p-1 gap-1.5">
                  {settingsTabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="w-full justify-start p-3 data-[state=active]:border-primary/40 dark:data-[state=active]:border-primary/40 data-[state=active]:shadow-none data-[state=active]:bg-primary/10 dark:data-[state=active]:bg-primary/10 hover:border-border data-[state=active]:text-accent-foreground overflow-hidden"
                      >
                        <div className="flex items-center space-x-3 text-left">
                          <Icon className="h-4 w-4 shrink-0" />
                          <div className="space-y-0.5">
                            <h3 className="font-medium">{tab.label}</h3>
                            <p className="text-xs text-wrap text-muted-foreground line-clamp-2">
                              {tab.description}
                            </p>
                          </div>
                        </div>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </CardContent>
            </Card>
          </div>

          {/* Content Area */}
          <div className="flex-1 h-full lg:overflow-y-auto">
            <TabsContent
              value="account"
              className="min-h-full pb-10 sm:pb-0"
            ></TabsContent>

            <TabsContent
              value="appearance"
              className="min-h-full space-y-6 py-10 sm:py-5"
            >
              <AppearanceSettings />
              <ThemeColorPicker />
              <FontSelect />
              <FontSizeSelector />
              <div className="flex justify-end px-6">
                <Button variant="outline" className="w-fit" onClick={handleReset}>
                  Reestablecer
                </Button>
              </div>
            </TabsContent>

            <TabsContent
              value="notifications"
              className="min-h-full pb-10 sm:pb-0"
            ></TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
