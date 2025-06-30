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
import { Search } from "lucide-react";
import { Pagination } from "@/components/common/pagination";
import type { School } from "@/types/school";
import { SchoolListSkeleton } from "@/components/skeletons/schools/school-list-skeleton";
import { SidebarSchoolItem } from "@/components/common/sidebar-school-item";

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
                  {schools.length === 0 && (
                    <div className="flex-1">
                      <p className="text-muted-foreground">Sin resultados</p>
                    </div>
                  )}
                  {schools.map((school) => (
                    <SidebarSchoolItem
                      key={school.id}
                      school={school}
                      selectedSchool={selectedSchool}
                      onSelectSchool={onSelectSchool}
                    />
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
