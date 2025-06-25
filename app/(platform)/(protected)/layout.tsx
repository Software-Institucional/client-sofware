import React from "react";

import { AppSidebar } from "@/components/dashboard/navigation/app-sidebar";
import { SiteHeader } from "@/components/dashboard/navigation/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ApplyThemeClass } from "@/components/dashboard/config/theme-config-effect";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ApplyThemeClass />
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset className="flex flex-col">
          <SiteHeader />
          <div className="flex-1 overflow-hidden">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
