"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import type { School } from "@/types/school";
import type { User } from "@/types/school-users";
import { Modal } from "@/components/common/modal";
import api from "@/lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useAuthStore } from "@/stores/auth-store";
import { useSchoolStore } from "@/stores/school-store";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useTransition } from "react";
import { Loader } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(1, "Requerido"),
  lastName: z.string().min(1, "Requerido"),
  email: z.string().email("Email inválido"),
  role: z.string().min(1, "Selecciona un rol"),
  activate: z.boolean().optional(),
});

interface UserFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User | null;
  mode: "create" | "edit";
}

export function UserFormDialog({
  isOpen,
  onOpenChange,
  user,
  mode,
}: UserFormDialogProps) {
  const queryClient = useQueryClient();
  const { user: authUser } = useAuthStore();
  const { selectedSchool } = useSchoolStore();

  const [isPending, startTransition] = useTransition();

  console.log("Usuario desde el form", user)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      role: user?.role || "",
      activate: user?.activate ?? true,
    },
  });

  useEffect(() => {
  if (user && mode === "edit") {
    form.reset({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      activate: user.activate ?? true,
    });
  }
}, [user, mode, form]);

  const createUser = async (
    data: z.infer<typeof formSchema>,
    schoolId: string,
    createdById: string
  ) => {
    const body = {
      email: data.email,
      role: data.role,
      firstName: data.firstName,
      lastName: data.lastName,
      createdById,
      schools: [{ schoolId }],
    };

    const response = await api.post("/auth/register", body);
    return response.data;
  };

  const updateUser = async (
    userId: string,
    data: z.infer<typeof formSchema>,
    schoolId: string
  ) => {
    const body = {
      id: userId,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      activate: data.activate,
      schools: [{ schoolId }],
    };

    const response = await api.put("/auth/update-user", body);
    return response.data;
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        if (!selectedSchool) return;

        if (mode === "create") {
          const createdById = authUser?.id;
          await createUser(values, selectedSchool.id, createdById!);
        } else if (user) {
          await updateUser(user.id, values, selectedSchool.id);
        }

        await queryClient.invalidateQueries({
          queryKey: ["schoolUsers", selectedSchool.id],
        });

        onOpenChange(false);
        form.reset();
      } catch (error) {
        const err = error as AxiosError;
        const message =
          (err.response?.data as { message?: string })?.message ??
          "Ocurrió un error al enviar el formulario.";
        toast.error(message);
      }
    });
  };

  return (
    <Modal
      title={mode === "create" ? "Agregar nuevo usuario" : "Editar usuario"}
      description={
        mode === "create"
          ? `Completa la información del nuevo usuario para ${selectedSchool?.name}`
          : "Modifica la información del usuario"
      }
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-6 pr-4">
            {/* Información Personal */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Información Personal</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido *</FormLabel>
                      <FormControl>
                        <Input placeholder="Apellido" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="usuario@ejemplo.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* Información Académica */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Información Académica</h3>
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar rol" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="DOCENTE">Docente</SelectItem>
                        <SelectItem value="ADMIN">Administrador</SelectItem>
                        <SelectItem value="COORDINADOR">Coordinador</SelectItem>
                        <SelectItem value="ESTUDIANTE">Estudiante</SelectItem>
                        <SelectItem value="SECRETARIO">Secretario</SelectItem>
                        <SelectItem value="BIBLIOTECARIO">
                          Bibliotecario
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* Estado del Usuario */}
            {mode === "edit" && (
              <>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Estado del Usuario</h3>
                  <FormField
                    control={form.control}
                    name="activate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="mb-0">Usuario activo</FormLabel>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Los usuarios inactivos no podrán acceder al sistema
                          hasta que sean reactivados.
                        </p>
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            <div className="flex items-center justify-end gap-2 pb-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader className="animate-spin" />}
                {mode === "create" ? "Crear usuario" : "Guardar cambios"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
