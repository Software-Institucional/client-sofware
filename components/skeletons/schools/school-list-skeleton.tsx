import { Skeleton } from "@/components/ui/skeleton";

export function SchoolListSkeleton() {
  return (
    <div className="flex-1">
      <div>
        <Skeleton className="h-4 w-24 mb-3 bg-neutral-200 dark:bg-secondary" />
      </div>
      <div className="px-2 space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="py-3 px-0 rounded-md">
            <div className="flex items-start gap-3 w-full">
              <Skeleton className="w-10 h-10 rounded-lg bg-neutral-200 dark:bg-secondary" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full bg-neutral-200 dark:bg-secondary" />
                <Skeleton className="h-3 w-3/4 bg-neutral-200 dark:bg-secondary" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
