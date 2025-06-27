"use client";
import type { ColumnDef } from "@tanstack/react-table";
import {
  CheckCircle,
  MoreHorizontal,
  XCircle,
  Edit,
  Trash2,
  CheckCircle2,
  CircleXIcon as XCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/ui/data-table";
import { ColumnHeader } from "@/components/common/column-header";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isEmailVerified: boolean;
  activate: boolean;
  schools: any[];
}

interface SchoolUsersTableProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
  pageIndex: number;
  onPageChange: (page: number) => void;
  pageCount: number;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

export function SchoolUsersTable({
  users,
  onEditUser,
  onDeleteUser,
  pageIndex,
  onPageChange,
  pageCount,
  pageSize,
  onPageSizeChange,
}: SchoolUsersTableProps) {

  const uniqueRoles = Array.from(new Set(users.map((user) => user.role)));
  const roleOptions = uniqueRoles.map((role) => ({
    label: role,
    value: role,
  }));

  const statusOptions = [
    { label: "Activo", value: "true" },
    { label: "Inactivo", value: "false" },
  ];

  const verifiedOptions = [
    { label: "Verificado", value: "true", icon: CheckCircle2 },
    { label: "No verificado", value: "false", icon: XCircle2 },
  ];

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => <ColumnHeader column={column} title="Usuario" />,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName} ${user.lastName}`}
              />
              <AvatarFallback>
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">
                {user.firstName} {user.lastName}
              </p>
            </div>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        const fullName =
          `${row.original.firstName} ${row.original.lastName}`.toLowerCase();
        const email = row.original.email.toLowerCase();
        const searchValue = value.toLowerCase();
        return fullName.includes(searchValue) || email.includes(searchValue);
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => <ColumnHeader column={column} title="Email" />,
      cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "role",
      header: ({ column }) => <ColumnHeader column={column} title="Rol" />,
      cell: ({ row }) => (
        <Badge variant="secondary">{row.getValue("role")}</Badge>
      ),
      filterFn: (row, id, value: string[]) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "activate",
      header: ({ column }) => <ColumnHeader column={column} title="Estado" />,
      cell: ({ row }) => {
        const isActive = row.getValue("activate");
        return (
          <Badge variant={isActive ? "default" : "destructive"}>
            {isActive ? "Activo" : "Inactivo"}
          </Badge>
        );
      },
      filterFn: (row, id, value: string[]) => {
        const isActive = row.getValue(id);
        return value.includes(String(isActive));
      },
    },
    {
      accessorKey: "isEmailVerified",
      header: ({ column }) => (
        <ColumnHeader column={column} title="Verificado" />
      ),
      cell: ({ row }) => {
        const isVerified = row.getValue("isEmailVerified");
        return isVerified ? (
          <CheckCircle className="h-5 w-5 text-green-600" />
        ) : (
          <XCircle className="h-5 w-5 text-red-600" />
        );
      },
      filterFn: (row, id, value: string[]) => {
        const isVerified = row.getValue(id);
        return value.includes(String(isVerified));
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir menú</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onEditUser(user)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onDeleteUser(user.id)}
                  className="text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={users}
      roleOptions={roleOptions}
      statusOptions={statusOptions}
      verifiedOptions={verifiedOptions}
      filterColumn="name"
      filterPlaceholder="Buscar por nombre..."
      pageIndex={pageIndex}
      onPageChange={onPageChange}
      pageCount={pageCount}
      pageSize={pageSize}
      onPageSizeChange={onPageSizeChange}
    />
  );
}
