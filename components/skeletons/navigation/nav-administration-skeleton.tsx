import { Skeleton } from "@/components/ui/skeleton";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface NavAdministrationSkeletonProps {
  size: number;
}

export function NavAdministrationSkeleton({
  size,
}: NavAdministrationSkeletonProps) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <Skeleton className="h-4 w-24 mb-2" />
      <SidebarMenu>
        {[...Array(size)].map((_, i) => (
          <SidebarMenuItem key={i}>
            <Skeleton className="p-2 flex items-center gap-2 py-3.5" />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
