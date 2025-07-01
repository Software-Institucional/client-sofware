"use client";

import { useEffect, useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import type { School } from "@/types/school";
import { Button } from "@/components/ui/button";
import { SchoolInfo } from "@/components/dashboard/users/school-info";
import { SchoolUsersTable } from "@/components/dashboard/users/table/school-users-table";
import { fetchSchoolUsers } from "@/utils/school-users";
import { SchoolSelector } from "@/components/dashboard/users/school-selector";
import { UserFormDialog } from "@/components/dashboard/users/user-form-dialog";
import { SchoolInfoSkeleton } from "@/components/skeletons/schools/school-info-skeleton";
import { SchoolUsersCardSkeleton } from "@/components/skeletons/schools/school-users-table-skeleton";

import { useSchoolStore } from "@/stores/school-store";
import { Filters, User } from "@/types/school-users";
import { SchoolStats } from "@/components/dashboard/users/school-stats";
import { CardStatsSkeleton } from "@/components/skeletons/common/card-stats-skeleton";
import { EmptyUsersState } from "./empty-users-state";
import { toast } from "sonner";
import { AxiosError } from "axios";
import api from "@/lib/axios";
import { AlertModal } from "@/components/common/alert-modal";

interface UsersContentProps {
  schools: School[];
  selectedSchool: School | null;
  isLoadingSchools: boolean;
  onSchoolSelect: (school: School) => void;
}

export function UsersContent({ schools, isLoadingSchools }: UsersContentProps) {
  const queryClient = useQueryClient();

  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isDeleting, startTransition] = useTransition();

  const [limit, setLimit] = useState(10);
  const [userPage, setUserPage] = useState(1);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditUser, setIsEditUser] = useState<boolean>(false);

  const { selectedSchool } = useSchoolStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    role: [],
    activate: [],
    isEmailVerified: [],
  });

  useEffect(() => {
    setUserPage(1);
  }, [selectedSchool]);

  const { data: usersData, isLoading: isLoadingUsers } = useQuery({
    queryKey: [
      "schoolUsers",
      selectedSchool?.id,
      userPage,
      limit,
      searchQuery,
      filters,
    ],
    queryFn: () =>
      selectedSchool
        ? fetchSchoolUsers(
            selectedSchool!.id,
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
    enabled: !!selectedSchool,
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
          queryKey: ["schoolUsers", selectedSchool?.id],
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
    <>
      <div className="flex-1 h-full space-y-6 overflow-y-auto p-5">
        {/* School selector - Only mobile */}
        <Card className="lg:hidden">
          <CardHeader>
            <CardTitle>Seleccionar Colegio</CardTitle>
            <CardDescription>
              Elige el colegio para gestionar sus usuarios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SchoolSelector schools={schools} />
          </CardContent>
        </Card>
        {/* School info - Only desktop */}
        {selectedSchool && (
          <SchoolInfo school={selectedSchool} className="hidden lg:block" />
        )}
        {/* School info skeleton */}
        {isLoadingSchools && !selectedSchool && <SchoolInfoSkeleton />}
        {/* School stats */}
        {!isLoadingSchools && schools.length > 0 && (
          <SchoolStats stats={stats} />
        )}
        {isLoadingSchools && <CardStatsSkeleton />}
        {/* Empty state */}
        {!isLoadingSchools && schools.length === 0 && !selectedSchool && (
          <EmptyUsersState />
        )}
        {/* Users table */}
        {selectedSchool && (
          <Card>
            <CardHeader className="flex flex-col lg:items-end md:flex-row justify-between gap-4">
              <div>
                <CardTitle className="text-lg">
                  Usuarios de {selectedSchool?.name}
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
        )}
        {/* Users table skeleton  */}
        {isLoadingSchools && !selectedSchool && <SchoolUsersCardSkeleton />}
      </div>

      {/* Dialogs */}
      {selectedSchool && (
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
    </>
  );
}
