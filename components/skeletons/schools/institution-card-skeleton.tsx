import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function InstitutionCardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card
          key={i}
          className="p-4 space-y-4 hover:shadow-md transition-shadow bg-input/30"
        >
          <div className="flex items-center gap-4">
            <Skeleton className="bg-neutral-300/80 dark:bg-secondary w-12 h-12 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="bg-neutral-300/80 dark:bg-secondary h-4 w-3/4" />
              <Skeleton className="bg-neutral-300/80 dark:bg-secondary h-3 w-1/2" />
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <Skeleton className="bg-neutral-300/80 dark:bg-secondary h-3 w-full" />
            <Skeleton className="bg-neutral-300/80 dark:bg-secondary h-3 w-5/6" />
            <Skeleton className="bg-neutral-300/80 dark:bg-secondary h-3 w-2/3" />
          </div>
        </Card>
      ))}
    </div>
  );
}
