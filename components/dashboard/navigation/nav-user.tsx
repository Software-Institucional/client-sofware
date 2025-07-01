"use client";

import { LogOutIcon, MoreVerticalIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import api from "@/lib/axios";
import { useAuthStore } from "@/stores/auth-store";
import { useSchoolStore } from "@/stores/school-store";
import { UserAvatar } from "@/components/common/user-avatar";
import { Skeleton } from "@/components/ui/skeleton";

export function NavUser() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { isMobile } = useSidebar();

  const handleLogout = async () => {
    try {
      await api.get("/auth/logout");

      // Reset store statuses
      useAuthStore.getState().clearUser();
      useSchoolStore.getState().reset();

      // Delete persistent storage
      localStorage.removeItem("auth-storage");
      localStorage.removeItem("school-store");

      // Clear all cookies
      document.cookie.split(";").forEach((cookie) => {
        const [name] = cookie.split("=");
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      });

      router.replace("/login");
    } catch (error) {
      toast.error(
        "Error al cerrar sesión. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserAvatar />
              {user ? (
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.firstName}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              ) : (
                <UserInfoSkeleton />
              )}
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserAvatar />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user?.firstName}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOutIcon />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function UserInfoSkeleton() {
  return (
    <div className="grid flex-1 text-left text-sm leading-tight">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-1 h-3 w-36" />
    </div>
  );
}
