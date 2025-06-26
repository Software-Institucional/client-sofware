import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export function DataTableSkeleton() {
  return (
    <div className="space-y-4">
      {/* Filtros + controles */}
      <div className="flex flex-col gap-4 w-full">
        <Skeleton className="h-8 w-60 bg-neutral-300/65 dark:bg-secondary" />

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between items-end w-full">
          <div className="flex flex-wrap gap-3 w-full">
            {[...Array(3)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-8 w-32 rounded-md bg-neutral-300/65 dark:bg-secondary"
              />
            ))}
          </div>

          <Skeleton className="h-8 w-32 rounded-md bg-neutral-300/65 dark:bg-secondary" />
        </div>
      </div>

      {/* Tabla */}
      <div className="rounded-md border overflow-x-auto">
        <div className="min-w-full divide-y">
          {/* Cabecera */}
          <div className="grid grid-cols-6 gap-4 px-4 py-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-4 w-full bg-neutral-300/65 dark:bg-secondary"
              />
            ))}
          </div>

          {/* Filas */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-6 items-center gap-4 px-4 py-4 border-t"
            >
              {[...Array(6)].map((_, j) => (
                <Skeleton
                  key={j}
                  className="h-4 w-full bg-neutral-300/65 dark:bg-secondary"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Footer / paginación */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-28 bg-neutral-300/65 dark:bg-secondary" />
          <Skeleton className="h-8 w-16 bg-neutral-300/65 dark:bg-secondary rounded-md" />
        </div>

        <div className="flex items-center space-x-2">
          {[ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight].map(
            (Icon, i) => (
              <Button key={i} variant="outline" size="sm" disabled>
                <Icon className="h-4 w-4" />
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
