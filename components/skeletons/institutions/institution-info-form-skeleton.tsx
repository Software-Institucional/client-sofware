import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InstitutionInfoFormSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">
          <Skeleton className="bg-neutral-200 dark:bg-secondary h-6 w-60" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Imagen */}
        <div className="space-y-2">
          <Skeleton className="bg-neutral-200 dark:bg-secondary h-6 w-40" />
          <Skeleton className="bg-neutral-200 dark:bg-secondary h-40 w-full rounded-md" />
        </div>

        <Separator />

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <Skeleton className="bg-neutral-200 dark:bg-secondary h-4 w-48 mb-1" />
            <Skeleton className="bg-neutral-200 dark:bg-secondary h-10 w-full rounded-md" />
          </div>
          <div>
            <Skeleton className="bg-neutral-200 dark:bg-secondary h-4 w-40 mb-1" />
            <Skeleton className="bg-neutral-200 dark:bg-secondary h-24 w-full rounded-md" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Skeleton className="bg-neutral-200 dark:bg-secondary h-4 w-32 mb-1" />
              <Skeleton className="bg-neutral-200 dark:bg-secondary h-10 w-full rounded-md" />
            </div>
            <div>
              <Skeleton className="bg-neutral-200 dark:bg-secondary h-4 w-32 mb-1" />
              <Skeleton className="bg-neutral-200 dark:bg-secondary h-10 w-full rounded-md" />
            </div>
          </div>
          <div>
            <Skeleton className="bg-neutral-200 dark:bg-secondary h-4 w-32 mb-1" />
            <Skeleton className="bg-neutral-200 dark:bg-secondary h-10 w-full rounded-md" />
          </div>
        </div>

        <Separator />

        {/* Selects */}
        <div className="space-y-4">
          <Skeleton className="bg-neutral-200 dark:bg-secondary h-5 w-40" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Skeleton className="bg-neutral-200 dark:bg-secondary h-4 w-32 mb-1" />
              <Skeleton className="bg-neutral-200 dark:bg-secondary h-10 w-full rounded-md" />
            </div>
            <div>
              <Skeleton className="bg-neutral-200 dark:bg-secondary h-4 w-32 mb-1" />
              <Skeleton className="bg-neutral-200 dark:bg-secondary h-10 w-full rounded-md" />
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-2 mt-6">
          <Skeleton className="bg-neutral-200 dark:bg-secondary h-10 w-24 rounded-md" />
          <Skeleton className="bg-neutral-200 dark:bg-secondary h-10 w-36 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}
