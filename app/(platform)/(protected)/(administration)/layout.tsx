"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/auth-store";

export default function AdministrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);
  const [localUserRole, setLocalUserRole] = useState<string | null>(null);

  useEffect(() => {
    setHydrated(true);

    if (!user) {
      const stored = localStorage.getItem("auth-storage");
      if (stored) {
        try {
          const parsed = JSON.parse(stored).state?.user;
          setLocalUserRole(parsed?.role ?? null);
        } catch {
          setLocalUserRole(null);
        }
      }
    }
  }, [user]);

  useEffect(() => {
    if (!hydrated) return;

    const role = user?.role || localUserRole;

    if (role !== "SUPER" && role !== "ADMIN") {
      router.replace("/dashboard");
    }
  }, [hydrated, user, localUserRole]);

  return <>{children}</>;
}
