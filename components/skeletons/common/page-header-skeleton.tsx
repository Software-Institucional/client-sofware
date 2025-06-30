import { Skeleton } from "@/components/ui/skeleton";

export function PageHeaderSkeleton() {
  return (
    <div className="flex flex-col space-y-2">
      <Skeleton className="bg-neutral-200 dark:bg-secondary h-8 w-80" />
      <Skeleton className="bg-neutral-200 dark:bg-secondary h-5 w-96" />
    </div>
  );
}
