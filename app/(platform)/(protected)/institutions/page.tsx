"use client";

import { PageHeader } from "@/components/common/page-header";
import { InstitutionForm } from "@/components/institutions/institution-form";
import { InstitutionsList } from "@/components/institutions/institutions-list";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { School } from "@/types/school";
import { fetchSchools } from "@/utils/schools";
import { useQuery } from "@tanstack/react-query";
import { Building2, MapPin, Plus, School as SchoolIcon, Search } from "lucide-react";
import React, { useState } from "react";

export default function InstitutionsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  // const [selectedInstitution, setSelectedInstitution] = useState(null)
  const [formMode, setFormMode] = useState<"create" | "edit">("create");

  const limit = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: paginatedData, isLoading: isLoadingSchools } = useQuery({
    queryKey: ["schools", searchTerm, currentPage],
    queryFn: () => fetchSchools(searchTerm, currentPage, limit),
    retry: 2,
  });

  const schools = paginatedData?.schools ?? [];
  const totalPages = paginatedData?.totalPages ?? 1;

  const stats = {
    total: 10,
    totalSedes: 20,
    departments: 32,
    municipalities: 6,
  };

  const handleEditInstitution = (institution: School) => {
    setFormMode("edit");
    setIsFormOpen(true);
  };

  const handleDeleteInstitution = (institutionId: string) => {
    // setInstitutions(institutions.filter((inst) => inst.id !== institutionId))
  };

  return (
    <div className="h-[calc(100vh-theme(spacing.16))] max-sm:pb-10 space-y-6 overflow-y-auto p-6">
      <PageHeader
        title="Gestión de Instituciones"
        description="Administra las instituciones educativas y sus sedes"
      />
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Instituciones
            </CardTitle>
            <SchoolIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sedes</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSedes}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departamentos</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.departments}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Municipios</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.municipalities}</div>
          </CardContent>
        </Card>
      </div>

      {/* Botón para crear nueva institución */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">
                Instituciones Educativas
              </CardTitle>
              <CardDescription className="text-sm">
                Lista de todas las instituciones registradas en el sistema
              </CardDescription>
            </div>
            <Button onClick={() => {
              setFormMode("create")
              setIsFormOpen(true)
            }} className="gap-2">
              <Plus className="size-4" />
              Nueva Institución
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar instituciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <InstitutionsList
              institutions={schools}
              onEdit={handleEditInstitution}
              onDelete={handleDeleteInstitution}
            />
          </div>
        </CardContent>
      </Card>

      {/* Formulario de institución */}
      <InstitutionForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        // institution={selectedInstitution}
        mode={formMode}
        onSave={() => {
          // if (formMode === "create") {
          //   setInstitutions([
          //     ...institutions,
          //     { ...institutionData, id: Date.now().toString() },
          //   ]);
          // } else {
          //   setInstitutions(
          //     institutions.map((inst) =>
          //       inst.id === selectedInstitution?.id ? institutionData : inst
          //     )
          //   );
          // }
          setIsFormOpen(false);
        }}
      />
    </div>
  );
}
