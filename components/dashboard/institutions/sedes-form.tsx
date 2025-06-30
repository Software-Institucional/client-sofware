"use client";

import { toast } from "sonner";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, MapPin, Phone, Trash2, Plus, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import api from "@/lib/axios";
import { School, Sede } from "@/types/school";
import { sedeFormSchema, SedeFormValues } from "@/schemas/institutions-schemas";

interface SedesFormProps {
  institution?: School | null;
  sedes: Sede[];
  setSedes: React.Dispatch<React.SetStateAction<Sede[]>>;
}

export function SedesForm({ institution, sedes, setSedes }: SedesFormProps) {
  const [isAddingSede, setIsAddingSede] = useState(false);

  const form = useForm<SedeFormValues>({
    resolver: zodResolver(sedeFormSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
    },
  });

  const createSede = async (sedeData: SedeFormValues, schoolId: string) => {
    const response = await api.post("/sedes", {
      name: sedeData.name,
      address: sedeData.address,
      phone: sedeData.phone,
      schoolId: schoolId,
    });

    return response.data;
  };

  const deleteSede = async (sedeId: string) => {
    const response = await fetch(
      `http://localhost:3000/schools/sedes/${sedeId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Error al eliminar la sede");
    }
  };

  const onAddSede = async (values: SedeFormValues) => {
    if (!institution?.id) {
      toast.error("Error", {
        description:
          "Primero debes guardar la institución antes de agregar sedes",
      });
      return;
    }

    setIsAddingSede(true);
    try {
      const newSede = await createSede(values, institution.id);
      setSedes([...sedes, newSede]);
      form.reset();
      toast.success("Sede creada", {
        description: "La sede se ha creado exitosamente",
      });
    } catch (error) {
      console.log("SEDES ERROR: ", error);
      toast.error("Error", {
        description: "No se pudo crear la sede",
      });
    } finally {
      setIsAddingSede(false);
    }
  };

  const handleRemoveSede = async (sedeId: string) => {
    try {
      await deleteSede(sedeId);
      setSedes(sedes.filter((sede) => sede.id !== sedeId));
      toast.success("Sede eliminada", {
        description: "La sede se ha eliminado exitosamente",
      });
    } catch (error) {
      toast.error("Error", {
        description: "No se pudo eliminar la sede",
      });
    }
  };

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          Sedes Registradas ({sedes.length})
        </h3>
        {sedes.length > 0 ? (
          <div className="space-y-3">
            {sedes.map((sede, i) => (
              <Card key={i}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{sede.name}</CardTitle>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveSede(sede.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {sede.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {sede.phone}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Creada: {new Date(sede.createdAt).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No hay sedes registradas</p>
            <p className="text-sm">Agrega la primera sede de la institución</p>
          </div>
        )}
      </div>

      <Separator className="my-5" />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Agregar Nueva Sede</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onAddSede)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la Sede *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Sede Principal" {...field} />
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
                      placeholder="Dirección completa de la sede"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono *</FormLabel>
                  <FormControl>
                    <Input placeholder="Teléfono de la sede" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="gap-2" disabled={isAddingSede}>
              {isAddingSede && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              <Plus className="h-4 w-4" />
              Agregar Sede
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
