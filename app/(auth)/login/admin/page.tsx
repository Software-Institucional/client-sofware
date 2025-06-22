"use client";

import { z } from "zod";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/stores/auth-store";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import api from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email({ message: "Correo inválido." }),
  password: z.string(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const setUser = useAuthStore((state) => state.setUser);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await api.post("/auth/login", data);

      const result = response.data;
      setUser(result.user);

      router.replace("/dashboard");
      form.reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message ||
          "Algo ha ido mal. Por favor, inténtelo de nuevo.";

        if (status === 401) {
          toast.error(
            "Credenciales no válidas. Por favor, compruebe su correo electrónico y contraseña."
          );
        } else if (status === 500) {
          toast.error("Error de servidor. Vuelva a intentarlo más tarde.");
        } else {
          toast.error(message);
        }
      } else {
        toast.error(
          "Error inesperado. Por favor, actualice e inténtelo de nuevo."
        );
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-md mx-auto"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="tu-correo@ejemplo.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="w-full"
        >
          {isSubmitting && <Loader className="animate-spin" />}
          Iniciar sesión
        </Button>
      </form>
    </Form>
  );
}
