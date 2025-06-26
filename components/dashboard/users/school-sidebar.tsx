"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Pagination } from "@/components/common/pagination";
import type { School } from "@/types/school";
import { SchoolListSkeleton } from "@/components/skeletons/schools/school-list-skeleton";

interface SchoolSidebarProps {
  schools: School[];
  isLoadingSchools: boolean;
  searchTerm: string;
  onSearch: (value: string) => void;
  selectedSchool: School | null;
  onSelectSchool: (school: School) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function SchoolSidebar({
  schools,
  searchTerm,
  isLoadingSchools,
  onSearch,
  selectedSchool,
  onSelectSchool,
  currentPage,
  totalPages,
  onPageChange,
}: SchoolSidebarProps) {
  return (
    <div className="lg:w-[320px] xl:w-[330px] flex-shrink-0 hidden lg:block overflow-hidden">
      <Card className="bg-accent dark:bg-accent/30 shadow-none min-h-full h-full rounded-none border-l-0 border-y-0 border-r pb-0">
        <CardHeader>
          <CardTitle className="text-lg">Seleccionar Colegio</CardTitle>
          <CardDescription>
            Elige el colegio para gestionar sus usuarios
          </CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar colegios..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
        </CardHeader>

        <CardContent className="flex flex-col flex-1 overflow-hidden min-h-0">
          {isLoadingSchools && (
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full pb-10">
                <div className="space-y-2 pb-4">
                  <SchoolListSkeleton />
                </div>
              </ScrollArea>
            </div>
          )}

          {!isLoadingSchools && (
            <div className="flex-1 overflow-hidden">
              <h2 className="text-sm font-medium text-muted-foreground mb-3">
                Colegios ({schools.length})
              </h2>

              <ScrollArea className="h-full pb-10">
                <div className="space-y-2 pb-4">
                  {schools.map((school) => (
                    <Button
                      key={school.id}
                      variant={
                        selectedSchool?.id === school.id ? "secondary" : "ghost"
                      }
                      className={cn(
                        "w-full justify-start h-auto p-3 text-left hover:bg-neutral-200 dark:hover:bg-secondary",
                        selectedSchool?.id === school.id &&
                          "bg-neutral-200 dark:bg-secondary"
                      )}
                      onClick={() => onSelectSchool(school)}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <img
                          src={school.imgUrl || "/placeholder.svg"}
                          alt={school.name}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                          onError={(e) => {
                            e.currentTarget.src =
                              "/placeholder.svg?height=40&width=40";
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-xs text-wrap line-clamp-2 mb-1">
                            {school.name}
                          </h3>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">
                              {school.municipality}, {school.department}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          <div className="py-2">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
