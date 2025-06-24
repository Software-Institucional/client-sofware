"use client";

import * as React from "react";
import Link from "next/link";

import { NavMain } from "@/components/dashboard/navigation/nav-main";
import { NavUser } from "@/components/dashboard/navigation/nav-user";
import { NavSecondary } from "@/components/dashboard/navigation/nav-secondary";
import { NavDocuments } from "@/components/dashboard/navigation/nav-documents";
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
