"use client";

import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div>
      <Button
        onClick={async () => {
          try {
            await api.get("/auth/logout");
            router.replace("/login");
          } catch (error) {
            console.log(error);
            toast.error(
              "Error al cerrar sesión. Por favor, inténtalo de nuevo más tarde."
            );
          }
        }}
      >
        Cerrar sesión
      </Button>
    </div>
  );
}
