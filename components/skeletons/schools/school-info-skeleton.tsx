import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function SchoolInfoSkeleton({ className }: { className?: string }) {
  const skeletonClass = "bg-neutral-300/65 dark:bg-secondary"

  return (
    <div
      className={cn(
        "rounded-lg border space-y-3 bg-background",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row items-start gap-4 bg-accent dark:bg-accent/30 p-4">
        <Skeleton className={cn("w-16 h-16 rounded-lg", skeletonClass)} />
        <div className="flex-1 space-y-2 w-full">
          <Skeleton className={cn("h-5 w-1/2", skeletonClass)} />

          <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm">
            <div className="min-w-0 space-y-3">
              <Skeleton className={cn("h-4 w-48", skeletonClass)} />
              <Skeleton className={cn("h-4 w-40", skeletonClass)} />
            </div>
            <div className="min-w-0 space-y-3">
              <Skeleton className={cn("h-4 w-52", skeletonClass)} />
              <Skeleton className={cn("h-4 w-48", skeletonClass)} />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Skeleton className={cn("h-6 w-24 rounded-full", skeletonClass)} />
            <Skeleton className={cn("h-6 w-28 rounded-full", skeletonClass)} />
          </div>
        </div>
      </div>
    </div>
  )
}
