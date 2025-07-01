"use client";

import { useAuthStore } from "@/stores/auth-store";
import { AdminUsersView } from "@/components/views/users/admin-users-view";
import { SuperAdminUsersView } from "@/components/views/users/super-admin-users-view";

export default function UsersPage() {
  const { user } = useAuthStore();

  const userRole = user?.role;

  return (
    <>
      {userRole === "SUPER" && <SuperAdminUsersView />}
      {userRole === "ADMIN" && <AdminUsersView />}
    </>
  );
}
