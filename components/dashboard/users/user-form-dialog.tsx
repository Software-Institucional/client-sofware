"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { ScrollArea } from "@/components/ui/scroll-area";

import type { School } from "@/types/school";
import type { User } from "@/types/school-users";

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
  school: School;
  user?: User | null;
  mode: "create" | "edit";
}

export function UserFormDialog({
  isOpen,
  onOpenChange,
  school,
  user,
  mode,
}: UserFormDialogProps) {
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Datos del formulario:", values);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Agregar Nuevo Usuario" : "Editar Usuario"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? `Completa la información del nuevo usuario para ${school.name}`
              : "Modifica la información del usuario"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Contenido con scroll - altura fija calculada */}
            <ScrollArea className="h-[calc(90vh-200px)] max-h-[600px] pb-5">
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
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar rol" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="DOCENTE">Docente</SelectItem>
                            <SelectItem value="ADMIN">Administrador</SelectItem>
                            <SelectItem value="COORDINADOR">
                              Coordinador
                            </SelectItem>
                            <SelectItem value="ESTUDIANTE">
                              Estudiante
                            </SelectItem>
                            <SelectItem value="SECRETARIO">
                              Secretario
                            </SelectItem>
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
              </div>
            </ScrollArea>

            {/* Footer fijo */}
            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {mode === "create" ? "Crear Usuario" : "Guardar Cambios"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
