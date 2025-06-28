import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CardStatsSkeleton() {
  const placeholders = Array.from({ length: 4 });

  return (
    <div className="flex flex-wrap gap-4">
      {placeholders.map((_, idx) => (
        <Card
          key={idx}
          className="@container/card flex-1 min-w-[150px] bg-accent/30 dark:bg-input/20 max-w-full shadow-sm"
        >
          <CardHeader className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-6 w-1/2 @[250px]/card:h-8" />
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
