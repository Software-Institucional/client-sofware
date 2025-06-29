"use client";

import type React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { School } from "@/types/school";
import { ImageUpload } from "./image-upload";
import { useTransition } from "react";
import {
  institutionFormSchema,
  InstitutionFormValues,
} from "@/schemas/institutions-schemas";
import api from "@/lib/axios";
import { AxiosError } from "axios";

const DEPARTMENTS = [
  "AMAZONAS",
  "ANTIOQUIA",
  "ARAUCA",
  "ATLÁNTICO",
  "BOLÍVAR",
  "BOYACÁ",
  "CALDAS",
  "CAQUETÁ",
  "CASANARE",
  "CAUCA",
  "CESAR",
  "CHOCÓ",
  "CÓRDOBA",
  "CUNDINAMARCA",
  "GUAINÍA",
  "GUAVIARE",
  "HUILA",
  "LA GUAJIRA",
  "MAGDALENA",
  "META",
  "NARIÑO",
  "NORTE DE SANTANDER",
  "PUTUMAYO",
  "QUINDÍO",
  "RISARALDA",
  "SAN ANDRÉS Y PROVIDENCIA",
  "SANTANDER",
  "SUCRE",
  "TOLIMA",
  "VALLE DEL CAUCA",
  "VAUPÉS",
  "VICHADA",
];

interface InstitutionInfoFormProps {
  institution?: School | null;
  mode: "create" | "edit";
  onSave: (institution: School) => void;
  imagePreview: string;
  setImagePreview: React.Dispatch<React.SetStateAction<string>>;
  sedes: School["sedes"];
}

export default function InstitutionInfoForm({
  institution,
  mode,
  onSave,
  imagePreview,
  setImagePreview,
  sedes,
}: InstitutionInfoFormProps) {
  console.log("IMAGEN DEL COLEGIO: ", imagePreview);
  const [isPending, startTransition] = useTransition();

  const form = useForm<InstitutionFormValues>({
    resolver: zodResolver(institutionFormSchema),
    defaultValues: {
      name: institution?.name || "",
      address: institution?.address || "",
      phone: institution?.phone || "",
      mail: institution?.mail || "",
      website: institution?.website || "",
      department: institution?.department || "",
      municipality: institution?.municipality || "",
      imgUrl: institution?.imgUrl || "",
    },
  });

  const createInstitution = async (data: InstitutionFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    if (data.imgUrl instanceof File) {
      formData.append("imgUrl", data.imgUrl); // Append the file
    }
    formData.append("department", data.department);
    formData.append("municipality", data.municipality);
    formData.append("mail", data.mail);
    formData.append("website", data.website || "");

    console.log("FORM DATA: ", Object.fromEntries(formData)); // Log for debugging
    const response = await api.post("/schools", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  };

  const updateInstitution = async (data: InstitutionFormValues) => {
    const formData = new FormData();
    formData.append("id", institution!.id);
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    if (data.imgUrl instanceof File) {
      formData.append("imgUrl", data.imgUrl); // Append the file
    }
    formData.append("department", data.department);
    formData.append("municipality", data.municipality);
    formData.append("mail", data.mail);
    formData.append("website", data.website || "");

    const response = await api.patch("/schools", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  };

  const onSubmit = async (values: InstitutionFormValues) => {
    startTransition(async () => {
      try {
        let institutionData: School;

        if (mode === "create") {
          institutionData = await createInstitution(values);
          toast.success("Institución creada", {
            description: "La institución se ha creado exitosamente",
          });
        } else {
          institutionData = await updateInstitution(values);
          toast.success("Institución actualizada", {
            description: "La institución se ha actualizado exitosamente",
          });
        }

        startTransition(() => {
          onSave({ ...institutionData, sedes });
          form.reset();
          setImagePreview("");
        });
      } catch (error) {
        const axiosError = error as AxiosError;
        console.log("AXIOS ERROR: ", axiosError);
        let errorMessage = "Ocurrió un error inesperado";
        if (axiosError.response) {
          switch (axiosError.response.status) {
            case 400:
              errorMessage =
                "Datos inválidos. Verifica la información ingresada.";
              break;
            case 401:
              errorMessage =
                "No autorizado. Por favor, inicia sesión nuevamente.";
              break;
            case 404:
              errorMessage = "Recurso no encontrado.";
              break;
            case 500:
              errorMessage =
                "Error en el servidor. Intenta de nuevo más tarde.";
              break;
            default:
              errorMessage = `Error ${axiosError.response.status}: ${axiosError.response.statusText}`;
          }
        } else if (axiosError.request) {
          errorMessage = "No se pudo conectar al servidor. Revisa tu conexión.";
        } else {
          errorMessage = `Error al procesar la solicitud: ${axiosError.message}`;
        }
        toast.error("Error", { description: errorMessage });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Imagen de la Institución</h3>
          <ImageUpload
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            setFieldValue={form.setValue}
          />
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la Institución *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nombre completo de la institución"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Dirección completa de la institución"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono *</FormLabel>
                    <FormControl>
                      <Input placeholder="Número de teléfono" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="correo@institucion.edu.co"
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
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sitio Web</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.institucion.edu.co"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Ubicación</h3>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departamento *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar departamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DEPARTMENTS.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="municipality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Municipio *</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del municipio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "create" ? "Crear Institución" : "Guardar Cambios"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
