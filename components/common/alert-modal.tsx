"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader } from "lucide-react";

interface AlertModalProps {
  description: string;
  open: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
  onOpenChange: (open: boolean) => void
}

export function AlertModal({ description, open, isSubmitting, onSubmit, onOpenChange }: AlertModalProps) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            {/* Esta acción no se puede deshacer. Se eliminará permanentemente la
            sede <strong>{sedeToDelete?.name}</strong> y todos sus datos
            asociados. */}
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onSubmit}
            disabled={isSubmitting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isSubmitting && <Loader className="animate-spin" />}
            {isSubmitting ? "Eliminando" : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
