import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SchoolStatsProps {
  stats: { value: number; label: string }[];
}

export function SchoolStats({ stats }: SchoolStatsProps) {
  return (
    <div className="flex flex-wrap gap-4">
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
