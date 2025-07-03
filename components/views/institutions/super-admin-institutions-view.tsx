"use client";

import { Plus, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/common/page-header";
import { Pagination } from "@/components/common/pagination";
import { InstitutionForm } from "@/components/dashboard/institutions/institution-form";
import InstitutionInfoForm from "@/components/dashboard/institutions/institution-info-form";
import { InstitutionsList } from "@/components/dashboard/institutions/institutions-list";
import { InstitutionsSidebar } from "@/components/dashboard/institutions/institutions-sidebar";
import { SedesForm } from "@/components/dashboard/institutions/sedes-form";
import InstitutionDetailsSkeleton from "@/components/skeletons/institutions/info-detail-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { School } from "@/types/school";
import { fetchSchools } from "@/utils/schools";
import { EmptyInstitutionsState } from "@/components/dashboard/institutions/empty-institution-state";

export function SuperAdminInstitutionsView() {
  const queryClient = useQueryClient();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState<School | null>(
    null
  );
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [sedes, setSedes] = useState<School["sedes"]>(
    selectedInstitution?.sedes || []
  );
  const [imagePreview, setImagePreview] = useState<string>(
    selectedInstitution?.imgUrl || ""
  );

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

  // Auto-select the first school if one is not already selected
  useEffect(() => {
    if (schools.length > 0 && !selectedInstitution) {
      setSelectedInstitution(schools[0]);
    }

    if (selectedInstitution) {
      setSedes(selectedInstitution.sedes);
      setImagePreview(selectedInstitution.imgUrl);
    }
  }, [schools, selectedInstitution, setSelectedInstitution]);

  const handleEditInstitution = (institution: School) => {
    setSelectedInstitution(institution);
    setFormMode("edit");
    setIsFormOpen(true);
  };

  const handleDeleteInstitution = (institutionId: string) => {
    // setInstitutions(institutions.filter((inst) => inst.id !== institutionId))
  };

  // Function to invalidate query after saving
  const handleSave = (updatedInstitution: School) => {
    queryClient.invalidateQueries({ queryKey: ["schools"] }); // Invalidate all schools queries
    setIsFormOpen(false);
    setSelectedInstitution(updatedInstitution);
  };

  const handleFormOpenChange = (isOpen: boolean) => {
    setIsFormOpen(isOpen);
  };

  return (
    <div className="h-dynamic max-lg:overflow-y-auto flex flex-col">
      <div className="hidden lg:flex flex-col lg:flex-row h-full">
        {/* Only for desktop view */}
        <InstitutionsSidebar
          institutions={schools}
          currentPage={currentPage}
          isLoadingInstitutions={isLoadingSchools}
          searchTerm={searchTerm}
          onSelectInstitution={setSelectedInstitution}
          selectedInstitution={selectedInstitution}
          totalPages={totalPages}
          onSearch={setSearchTerm}
          onPageChange={setCurrentPage}
          onNewInstitutionChange={() => {
            setFormMode("create");
            setIsFormOpen(true);
          }}
        />

        {/* Institution edit form - desktop view  */}
        {isLoadingSchools && !selectedInstitution ? (
          <InstitutionDetailsSkeleton />
        ) : (
          <div className="flex-1 h-full space-y-6 overflow-y-auto p-5">
            {schools.length === 0 ? (
              <EmptyInstitutionsState />
            ) : (
              <>
                <PageHeader
                  title={`Actualiza la información de ${selectedInstitution?.name.toUpperCase()}`}
                  description="Administra la información de la institutioón, así como sus sedes."
                />
                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="general">
                      Información General
                    </TabsTrigger>
                    <TabsTrigger value="sedes">Sedes</TabsTrigger>
                  </TabsList>

                  <TabsContent value="general" className="space-y-6 mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl">
                          Información del colegio
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <InstitutionInfoForm
                          institution={selectedInstitution}
                          mode="edit"
                          onSave={handleSave}
                          imagePreview={imagePreview}
                          setImagePreview={setImagePreview}
                          sedes={selectedInstitution?.sedes ?? []}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="sedes" className="space-y-6 mt-6">
                    <Card>
                      <CardContent>
                        <SedesForm
                          institution={selectedInstitution}
                          sedes={sedes}
                          setSedes={setSedes}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        )}
      </div>

      <PageHeader
        title="Gestión de Instituciones"
        description="Administra las instituciones educativas y sus sedes."
        className="mb-4 block lg:hidden"
      />

      {/* Institutions list - Mobile view */}
      <Card className="block lg:hidden">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center pb-2">
            <div>
              <CardTitle className="text-2xl">
                Instituciones Educativas
              </CardTitle>
              <CardDescription className="text-sm">
                Lista de todas las instituciones registradas en el sistema
              </CardDescription>
            </div>
            <Button
              onClick={() => {
                setFormMode("create");
                setIsFormOpen(true);
              }}
              className="gap-2"
            >
              <Plus className="size-4" />
              Nueva Institución
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search input */}
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
              loading={isLoadingSchools}
            />

            <div className="py-2">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal form - Mobile view */}
      <InstitutionForm
        institution={selectedInstitution}
        isOpen={isFormOpen}
        onOpenChange={handleFormOpenChange}
        mode={formMode}
        onSave={handleSave}
      />
    </div>
  );
}
