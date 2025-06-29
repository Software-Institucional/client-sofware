import * as z from "zod";

// Custom transformer to handle File objects (though we'll handle files separately)
const fileOrString = z.union([z.string().min(1, { message: "La imagen es requerida." }), z.any()]);

export const institutionFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  address: z.string().min(5, { message: "La dirección debe tener al menos 5 caracteres." }),
  phone: z.string().min(7, { message: "El teléfono debe tener al menos 7 caracteres." }),
  mail: z.string().email({ message: "Por favor ingresa un email válido." }),
  website: z.string().url({ message: "Por favor ingresa una URL válida." }).optional().or(z.literal("")),
  department: z.string().min(1, { message: "Por favor selecciona un departamento." }),
  municipality: z.string().min(2, { message: "El municipio debe tener al menos 2 caracteres." }),
  imgUrl: fileOrString, // Allow string or File, but File will be handled in submission
});

export const sedeFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  address: z
    .string()
    .min(5, { message: "La dirección debe tener al menos 5 caracteres." }),
  phone: z
    .string()
    .min(7, { message: "El teléfono debe tener al menos 7 caracteres." }),
});

export type SedeFormValues = z.infer<typeof sedeFormSchema>;
export type InstitutionFormValues = z.infer<typeof institutionFormSchema>;
