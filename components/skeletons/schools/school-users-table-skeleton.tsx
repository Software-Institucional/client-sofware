import { Card, CardContent } from "@/components/ui/card";
import { DataTableSkeleton } from "@/components/skeletons/common/data-table-skeleton";

export function SchoolUsersCardSkeleton() {
  return (
    <Card>
      <CardContent>
        <DataTableSkeleton />
      </CardContent>
    </Card>
  );
}
