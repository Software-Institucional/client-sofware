"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import type { School } from "@/types/school";
import { SchoolInfo } from "@/components/dashboard/users/school-info";
import { SchoolUsersTable } from "@/components/dashboard/users/table/school-users-table";
import { fetchSchoolUsers } from "@/utils/school-users";
import { SchoolSelector } from "./school-selector";
import { Button } from "@/components/ui/button";
import { UserFormDialog } from "./user-form-dialog";
import { SchoolInfoSkeleton } from "@/components/skeletons/schools/school-info-skeleton";
import { SchoolUsersCardSkeleton } from "@/components/skeletons/schools/school-users-table-skeleton";

import { useSchoolStore } from "@/stores/school-store";
import { User } from "@/types/school-users";

interface UsersContentProps {
  schools: School[];
  selectedSchool: School | null;
  isLoadingSchools: boolean;
  onSchoolSelect: (school: School) => void;
}

export function UsersContent({ schools, isLoadingSchools }: UsersContentProps) {
  const [limit, setLimit] = useState(10);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [isEditUser, setIsEditUser] = useState<boolean>(false);

  const { selectedSchool, currentPage, setCurrentPage } = useSchoolStore();

  const { data: usersData } = useQuery({
    queryKey: ["schoolUsers", selectedSchool?.id, currentPage, limit],
    queryFn: () =>
      selectedSchool
        ? fetchSchoolUsers(selectedSchool.id, currentPage, limit)
        : Promise.resolve({ users: [], page: 1, limit: 10, totalPages: 1 }),
    enabled: !!selectedSchool,
  });

  const totalPages = usersData?.totalPages ?? 1;
  const users = usersData?.users ?? [];

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
        {isLoadingSchools && !selectedSchool && <SchoolInfoSkeleton />}

        {selectedSchool && (
          <Card>
            <CardHeader className="flex flex-col items-end md:flex-row justify-between">
              <div>
                <CardTitle className="text-lg">
                  Usuarios de {selectedSchool?.name}
                </CardTitle>
                <CardDescription>
                  Gestiona los usuarios asignados a este colegio
                </CardDescription>
              </div>
              <Button onClick={() => setIsAddUserOpen(true)}>
                <Plus /> Crear nuevo usuario
              </Button>
            </CardHeader>
            <CardContent>
              <SchoolUsersTable
                users={users}
                onEditUser={(user) => {
                  console.log(user);
                  setEditUser(user);
                  setIsEditUser(true);
                }}
                onDeleteUser={() => {}}
                pageIndex={currentPage - 1}
                onPageChange={(index) => setCurrentPage(index + 1)}
                pageCount={totalPages}
                pageSize={limit}
                onPageSizeChange={(size) => setLimit(size)}
              />
            </CardContent>
          </Card>
        )}

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
            user={editUser}
          />
        </>
      )}
    </>
  );
}
