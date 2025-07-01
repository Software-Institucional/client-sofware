"use client";

import { useAuthStore } from "@/stores/auth-store";
import { AdminInstitutionView } from "@/components/views/institutions/admin-institution-view";
import { SuperAdminInstitutionsView } from "@/components/views/institutions/super-admin-institutions-view";

export default function InstitutionsPage() {
  const { user } = useAuthStore();

  const userRole = user?.role;

  return (
    <>
      {userRole === "SUPER" && <SuperAdminInstitutionsView />}
      {userRole === "ADMIN" && <AdminInstitutionView />}
    </>
  );
}
