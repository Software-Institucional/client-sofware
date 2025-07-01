"use client";

import { toast } from "sonner";
import { AxiosError } from "axios";
import { Plus } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState, useTransition } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Filters, User } from "@/types/school-users";
import { fetchSchoolUsers } from "@/utils/school-users";
import { PageHeader } from "@/components/common/page-header";
import { useInstitutionStore } from "@/stores/institution-store";
import { UserFormDialog } from "@/components/dashboard/users/user-form-dialog";
import { SchoolUsersTable } from "@/components/dashboard/users/table/school-users-table";
import { SchoolInfo } from "@/components/dashboard/users/school-info";
import { SchoolStats } from "@/components/dashboard/users/school-stats";
import { CardStatsSkeleton } from "@/components/skeletons/common/card-stats-skeleton";
import { AlertModal } from "@/components/common/alert-modal";

export function AdminUsersView() {
  const queryClient = useQueryClient();

  const { institution } = useInstitutionStore();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isDeleting, startTransition] = useTransition();

  const [limit, setLimit] = useState(10);
  const [userPage, setUserPage] = useState(1);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditUser, setIsEditUser] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    role: [],
    activate: [],
    isEmailVerified: [],
  });

  const [institutionId, setInstitutionId] = useState(institution?.id);

  useEffect(() => {
    if (institution && institution.id) {
      setInstitutionId(institution.id);
    }
  }, [institution, institution?.id]);

  const { data: usersData, isLoading: isLoadingUsers } = useQuery({
    queryKey: [
      "schoolUsers",
      institutionId,
      userPage,
      limit,
      searchQuery,
      filters,
    ],
    queryFn: () =>
      institutionId
        ? fetchSchoolUsers(
            institutionId!,
            userPage,
            limit,
            searchQuery,
            filters
          )
        : Promise.resolve({
            users: [],
            page: 1,
            limit: 10,
            totalPages: 1,
            totalUsers: 0,
            activeUsers: 0,
            totalSedes: 0,
            teachers: 0,
          }),
    enabled: !!institutionId,
  });

  const totalPages = usersData?.totalPages ?? 1;
  const users = usersData?.users ?? [];
  const stats = [
    {
      label: "Sedes",
      value: usersData?.totalSedes ?? 0,
    },
    {
      label: "Total de usuarios",
      value: usersData?.totalUsers ?? 0,
    },
    {
      label: "Total de docentes",
      value: usersData?.teachers ?? 0,
    },
    {
      label: "Usuarios activos",
      value: usersData?.teachers ?? 0,
    },
  ];

  const handleDelete = () => {
    console.log(selectedUser?.id);
    startTransition(async () => {
      try {
        await api.delete(`/auth/user/${selectedUser?.id}`);
        toast.success("Eliminación exitosa.", {
          description: `El usuario ${selectedUser?.firstName} fue eliminado.`,
        });
        setSelectedUser(null);
        setIsOpenAlert(false);
        await queryClient.invalidateQueries({
          queryKey: ["schoolUsers", institutionId],
        });
      } catch (error) {
        const err = error as AxiosError;
        const message =
          (err.response?.data as { message?: string })?.message ??
          "Ocurrió un error al eliminar al usuario.";
        toast.error(message);
      }
    });
  };

  return (
    <div className="h-[calc(100vh-theme(spacing.16))] flex flex-col">
      <div className="flex-1 h-full space-y-6 overflow-y-auto p-6 max-sm:pb-10">
        <PageHeader
          title="Gestión de Usuarios"
          description="Crea accesos al sistema para tu institución o edita la informacion de los usuarios."
        />
        <div className="flex flex-col lg:flex-row gap-4">
          {institution && <SchoolInfo school={institution} />}
          {/* School stats */}
          {!isLoadingUsers && (
            <SchoolStats stats={stats} className="hidden md:flex" />
          )}
          {isLoadingUsers && <CardStatsSkeleton />}
        </div>

        {/* Users table */}
        <Card>
          <CardHeader className="flex flex-col lg:items-end md:flex-row justify-between gap-4">
            <div>
              <CardTitle className="text-lg">
                Usuarios de la Institución
              </CardTitle>
              <CardDescription>
                Gestiona los usuarios asignados a este colegio
              </CardDescription>
            </div>
            <Button
              className="max-md:w-full"
              onClick={() => setIsAddUserOpen(true)}
            >
              <Plus /> Crear nuevo usuario
            </Button>
          </CardHeader>
          <CardContent>
            <SchoolUsersTable
              users={users}
              onEditUser={(user) => {
                setSelectedUser(user);
                setIsEditUser(true);
              }}
              onDeleteUser={(user) => {
                setIsOpenAlert(true);
                setSelectedUser(user);
              }}
              pageIndex={userPage - 1}
              onPageChange={(index) => setUserPage(index + 1)}
              pageCount={totalPages}
              pageSize={limit}
              onPageSizeChange={(size) => setLimit(size)}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
              filters={filters}
              onFiltersChange={setFilters}
              isLoadingUsers={isLoadingUsers}
            />
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      {institutionId && (
        <>
          <UserFormDialog
            isOpen={isAddUserOpen}
            onOpenChange={setIsAddUserOpen}
            mode="create"
          />

          <UserFormDialog
            isOpen={isEditUser}
            onOpenChange={setIsEditUser}
            mode="edit"
            user={selectedUser}
          />
        </>
      )}

      <AlertModal
        description={`Esta acción no se puede deshacer. Se eliminará permanentemente el usuario ${selectedUser?.firstName} ${selectedUser?.lastName} y todos sus datos asociados.`}
        isSubmitting={isDeleting}
        open={isOpenAlert}
        onOpenChange={setIsOpenAlert}
        onSubmit={handleDelete}
      />
    </div>
  );
}
