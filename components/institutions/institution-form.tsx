"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { School } from "@/types/school";
import { SedesForm } from "./sedes-form";
import InstitutionInfoForm from "./institution-info-form";

interface InstitutionFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  institution?: School | null;
  mode: "create" | "edit";
  onSave: (institution: School) => void;
}

export function InstitutionForm({
  isOpen,
  onOpenChange,
  institution,
  mode,
  onSave,
}: InstitutionFormProps) {
  const [imagePreview, setImagePreview] = useState<string>(
    institution?.imgUrl || ""
  );
  const [sedes, setSedes] = useState<School["sedes"]>(institution?.sedes || []);

  useEffect(() => {
    setImagePreview(institution?.imgUrl ?? "")
  }, [institution?.imgUrl])

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Crear Nueva Institución"
              : "Editar Institución"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Completa la información de la nueva institución educativa"
              : "Modifica la información de la institución"}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">Información General</TabsTrigger>
            <TabsTrigger value="sedes" disabled={mode === "create"}>
              Sedes {mode === "create" && "(Disponible después de crear)"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6 mt-6">
            <InstitutionInfoForm
              institution={institution}
              mode={mode}
              onSave={onSave}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
              sedes={sedes}
            />
          </TabsContent>

          <TabsContent value="sedes" className="space-y-6 mt-6">
            <SedesForm
              institution={institution}
              sedes={sedes}
              setSedes={setSedes}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
