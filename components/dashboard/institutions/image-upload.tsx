"use client";

import type React from "react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, ImageIcon } from "lucide-react";
import { UseFormSetValue } from "react-hook-form";
import { InstitutionFormValues } from "@/schemas/institutions-schemas";

interface ImageUploadProps {
  imagePreview: string;
  setImagePreview: React.Dispatch<React.SetStateAction<string>>;
  setFieldValue: UseFormSetValue<InstitutionFormValues>;
}

export function ImageUpload({
  imagePreview,
  setImagePreview,
  setFieldValue,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result); // Set the full DataURL for preview
        setFieldValue("imgUrl", file); // Store the file object (type mismatch noted)
      };
      reader.readAsDataURL(file); // Read as DataURL for preview
    }
  };

  const handleRemoveImage = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the click from propagating to the parent div
    setImagePreview("");
    setFieldValue("imgUrl", null); // Clear the file
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input value
    }
  };

  return (
    <div className="flex flex-row lg:flex-col xl:flex-row items-center gap-6 p-4 bg-gray-50 rounded-xl dark:bg-input/30">
      <div
        className="relative group"
        onClick={() => fileInputRef.current?.click()}
      >
        {imagePreview ? (
          <div className="relative">
            <div className="relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-xl border-2 border-gray-200 transition-transform duration-300 group-hover:scale-105 dark:border-gray-700"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=128&width=128";
                }}
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-3 -right-3 h-8 w-8 rounded-full p-0 bg-red-500 hover:bg-red-600 transition-colors duration-200 dark:bg-red-600 dark:hover:bg-red-700"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4 text-white" />
            </Button>
          </div>
        ) : (
          <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gradient-to-br from-gray-100 to-white  hover:border-primary transition-all duration-300 cursor-pointer dark:from-neutral-900 dark:to-neutral-800 dark:border-neutral-700 dark:hover:border-primary">
            <ImageIcon className="h-10 w-10 text-gray-500 group-hover:text-primary transition-colors duration-300 dark:text-gray-400 dark:group-hover:text-primary" />
          </div>
        )}
      </div>
      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center gap-2 px-4 py-2 border-2 hover:text-primary-foreground hover:bg-primary hover:border-primary transition-all duration-300 rounded-lg shadow-sm dark:hover:bg-primary dark:hover:border-primary"
        >
          <Upload className="h-5 w-5" /> Subir Imagen
        </Button>
        <p className="text-sm text-gray-600 font-medium dark:text-gray-300">
          Formatos soportados: JPG, PNG, WEBP | Máximo: 5MB
        </p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
}
