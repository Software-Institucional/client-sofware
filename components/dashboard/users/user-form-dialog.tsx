"use client";

import * as z from "zod";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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

import api from "@/lib/axios";
import type { User } from "@/types/school-users";
import { Modal } from "@/components/common/modal";
import { School } from "@/types/school";
import { roles } from "@/constants/users";
import { fetchSchools } from "@/utils/schools";
import { useAuthStore } from "@/stores/auth-store";
import { useSchoolStore } from "@/stores/school-store";
import { SedeSelector } from "@/components/dashboard/users/sede-selector";
import { SchoolSelector } from "@/components/dashboard/users/school-selector";
import { useInstitutionStore } from "@/stores/institution-store";

const formSchema = z.object({
  firstName: z.string().trim().min(1, "Requerido"),
  lastName: z.string().trim().min(1, "Requerido"),
  email: z.string().trim().email("Email inválido"),
  role: z.string().trim().min(1, "Selecciona un rol"),
  activate: z.boolean().optional(),
  sedeId: z.string().trim().optional(),
  schoolId: z.string().min(1, "Selecciona un colegio"),
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
  const { institution } = useInstitutionStore();

  const [currentSelectedSchool, setCurrentSelectedSchool] = useState(
    authUser?.role === "SUPER" ? selectedSchool : institution
  );

  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10;

  const { data } = useQuery({
    queryKey: ["userEditSchools", searchTerm],
    queryFn: () => fetchSchools(searchTerm, 1, limit),
    enabled: !!searchTerm,
  });

  const schools: School[] = data?.schools ?? [];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      role:
        user?.role ??
        (mode === "create" && authUser?.role === "ADMIN" ? "DOCENTE" : ""),
      activate: user?.activate ?? true,
      schoolId: currentSelectedSchool?.id,
      sedeId: user?.sedes?.id ?? "",
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
        sedeId: user.sedes?.id ?? "",
        schoolId: currentSelectedSchool?.id,
      });
    } else if (mode === "create") {
      form.reset({
        firstName: "",
        lastName: "",
        email: "",
        role: authUser?.role === "ADMIN" ? "DOCENTE" : "",
        activate: true,
        sedeId: "",
        schoolId: currentSelectedSchool?.id,
      });
    }
  }, [user, mode, form, institution, selectedSchool]);

  // Actualiza el valor dependiendo del rol
  useEffect(() => {
    if (authUser?.role === "SUPER") {
      setCurrentSelectedSchool(selectedSchool);
    } else {
      setCurrentSelectedSchool(institution);
    }
  }, [authUser?.role, selectedSchool, institution]);

  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");

      const fallbackSchool =
        authUser?.role === "SUPER" ? selectedSchool : institution;
      const initialSchool = user?.school ?? fallbackSchool;

      setCurrentSelectedSchool(initialSchool);

      form.reset({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        role:
          user?.role ??
          (mode === "create" && authUser?.role === "ADMIN" ? "DOCENTE" : ""),
        activate: user?.activate ?? true,
        schoolId: user?.school?.id ?? currentSelectedSchool?.id ?? "",
        sedeId: user?.sedes?.id ?? "",
      });
    }
  }, [isOpen, user, selectedSchool, institution, authUser?.role]);

  const { isValid } = form.formState;

  const createUser = async (data: z.infer<typeof formSchema>) => {
    const body = {
      email: data.email,
      role: data.role,
      firstName: data.firstName,
      lastName: data.lastName,
      createdById: authUser?.id,
      schoolId: data.schoolId,
      ...(data.sedeId && data.sedeId.trim() !== "" && { sedeId: data.sedeId }),
    };

    const response = await api.post("/auth/register", body);
    return response.data;
  };

  const updateUser = async (data: z.infer<typeof formSchema>) => {
    const body = {
      id: user?.id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      activate: data.activate,
      schoolId: data.schoolId,
      ...(data.sedeId && data.sedeId.trim() !== "" && { sedeId: data.sedeId }),
    };

    const response = await api.put("/auth/update-user", body);
    return response.data;
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        if (!currentSelectedSchool) return;

        if (mode === "create") {
          await createUser(values);
          toast.success("Usuario creado.");
        } else if (user) {
          await updateUser(values);
          toast.success("Usuario actualizado.");
        }

        await queryClient.invalidateQueries({
          queryKey: ["schoolUsers", currentSelectedSchool?.id],
        });

        onOpenChange(false);
        form.reset({
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          email: user?.email || "",
          role: user?.role || "",
          activate: user?.activate ?? true,
          schoolId: user?.school?.id ?? currentSelectedSchool?.id ?? "",
          sedeId: user?.sedes?.id ?? "",
        });
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
          ? `Completa la información del nuevo usuario para ${currentSelectedSchool?.name}`
          : "Modifica la información del usuario"
      }
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-6 pr-4">
            {/* Personal information */}
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
                        <Input
                          placeholder="Nombre"
                          className="bg-input/30"
                          {...field}
                        />
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
                        <Input
                          placeholder="Apellido"
                          className="bg-input/30"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                disabled={mode === "edit"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="usuario@ejemplo.com"
                        className="bg-input/30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* Academic information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Información Académica</h3>

              {authUser?.role === "SUPER" && <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-input/30">
                          <SelectValue placeholder="Seleccionar rol" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map(({ value, label }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />}

              {mode === "edit" && authUser?.role === "SUPER" && (
                <FormField
                  control={form.control}
                  name="schoolId"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Colegio *</FormLabel>
                      <SchoolSelector
                        isEditing
                        schools={schools ?? []}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        selectedSchool={currentSelectedSchool}
                        setCurrentSelectedSchool={setCurrentSelectedSchool}
                        onSelect={(id) => {
                          const previousSchoolId = form.getValues("schoolId");

                          if (previousSchoolId !== id) {
                            // Cambió a un colegio diferente: limpiar sedeId
                            form.setValue("sedeId", "");
                          } else if (user?.sedes?.id) {
                            // Volvió al colegio original: restaurar sedeId si la tenía
                            form.setValue("sedeId", user.sedes.id);
                          }

                          const selected = schools.find((s) => s.id === id);
                          setCurrentSelectedSchool(selected ?? null);

                          field.onChange(id);
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {currentSelectedSchool &&
                currentSelectedSchool?.sedes.length > 0 && (
                  <FormField
                    control={form.control}
                    name="sedeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sede</FormLabel>
                        <SedeSelector
                          selectedSchool={currentSelectedSchool}
                          value={field.value}
                          onChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
            </div>

            {/* User state */}
            {mode === "edit" && (
              <>
                <Separator />
                <div className="space-y-4 bg-input/30 border rounded-md p-3">
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
              <Button type="submit" disabled={isPending || !isValid || authUser?.role === "ADMIN" && !form.watch("sedeId")}>
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
