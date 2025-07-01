"use client";

import * as React from "react";
import Link from "next/link";

import { NavMain } from "@/components/dashboard/navigation/nav-main";
import { NavUser } from "@/components/dashboard/navigation/nav-user";
import { NavSecondary } from "@/components/dashboard/navigation/nav-secondary";
import { NavAdministration } from "@/components/dashboard/navigation/nav-administration";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/common/logo";
import { data } from "@/constants/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { NavAdministrationSkeleton } from "@/components/skeletons/navigation/nav-administration-skeleton";

const adminRoles = ["SUPER", "ADMIN"];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore();

  const showAdministrationRoutes = adminRoles.includes(user?.role ?? "");

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 h-auto"
            >
              <Link href="#">
                <Logo showName logoClassname="h-8" labelClassname="text-xl" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {!user ? (
          <NavAdministrationSkeleton size={data.administration.length} />
        ) : showAdministrationRoutes && (
          <NavAdministration items={data.administration} />
        )}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
