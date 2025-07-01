import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SchoolStatsProps {
  stats: { value: number; label: string }[];
  className?: string;
}

export function SchoolStats({ stats, className }: SchoolStatsProps) {
  return (
    <div className={cn("flex flex-wrap gap-4", className)}>
      {stats.map((stat, idx) => (
        <Card
          key={idx}
          className="@container/card flex-1 min-w-[150px] bg-accent dark:bg-input/30 max-w-full shadow-sm"
        >
          <CardHeader className="relative">
            <CardDescription>{stat.label}</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {stat.value}
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
