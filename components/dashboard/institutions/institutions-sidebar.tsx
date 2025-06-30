"use client";

import React from "react";
import { MapPin, Plus, Search } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { School } from "@/types/school";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pagination } from "@/components/common/pagination";
import { SchoolListSkeleton } from "@/components/skeletons/schools/school-list-skeleton";
import { SidebarSchoolItem } from "@/components/common/sidebar-school-item";

interface InstitutionsSidebarProps {
  institutions: School[];
  isLoadingInstitutions: boolean;
  searchTerm: string;
  onSearch: (value: string) => void;
  selectedInstitution: School | null;
  onSelectInstitution: (school: School) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNewInstitutionChange: () => void;
}

export function InstitutionsSidebar({
  institutions,
  isLoadingInstitutions,
  searchTerm,
  onSearch,
  selectedInstitution,
  onSelectInstitution,
  currentPage,
  totalPages,
  onPageChange,
  onNewInstitutionChange,
}: InstitutionsSidebarProps) {
  return (
    <div className="lg:w-[320px] xl:w-[330px] flex-shrink-0 hidden lg:block overflow-hidden">
      <Card className="bg-accent dark:bg-accent/30 shadow-none min-h-full h-full rounded-none border-l-0 border-y-0 border-r pb-0">
        <CardHeader>
          <CardTitle className="text-lg">Instituciones Educativas</CardTitle>
          <CardDescription>
            Lista de todas las instituciones registradas en el sistema
          </CardDescription>
          <div className="relative mt-4 space-y-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
          <Button
            variant="secondary"
            className="mt-2"
            onClick={onNewInstitutionChange}
          >
            <Plus /> Nueva institución
          </Button>
        </CardHeader>

        <CardContent className="flex flex-col flex-1 overflow-hidden min-h-0">
          {isLoadingInstitutions && (
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full pb-10">
                <div className="space-y-2 pb-4">
                  <SchoolListSkeleton />
                </div>
              </ScrollArea>
            </div>
          )}

          {!isLoadingInstitutions && (
            <div className="flex-1 overflow-hidden">
              <h2 className="text-sm font-medium text-muted-foreground mb-3">
                Colegios ({institutions.length})
              </h2>

              <ScrollArea className="h-full pb-10">
                <div className="space-y-2 pb-4">
                  {institutions.length === 0 && (
                    <div className="flex-1">
                      <p className="text-muted-foreground">Sin resultados</p>
                    </div>
                  )}
                  {institutions.map((institution) => (
                    <SidebarSchoolItem
                      key={institution.id}
                      school={institution}
                      selectedSchool={selectedInstitution}
                      onSelectSchool={onSelectInstitution}
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
