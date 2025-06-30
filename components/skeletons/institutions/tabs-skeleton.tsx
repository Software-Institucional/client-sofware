import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InstitutionInfoFormSkeleton from "@/components/skeletons/institutions/institution-info-form-skeleton";

export function TabsSkeleton() {
  return (
    <div className="w-full space-y-6">
      {/* Tabs list */}
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="bg-neutral-200 dark:bg-secondary h-10 w-full rounded-md" />
        <Skeleton className="bg-neutral-200 dark:bg-secondary h-10 w-full rounded-md" />
      </div>

      {/* Tabs content - Información General (Card) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            <Skeleton className="bg-neutral-200 dark:bg-secondary h-6 w-60" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <InstitutionInfoFormSkeleton />
        </CardContent>
      </Card>
    </div>
  );
}
