"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useState, Suspense } from "react";
import { AxiosError } from "axios";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import api from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormWrapper } from "@/components/auth/form-wrapper";
import { AnimatedInputWrapper } from "@/components/auth/animated-input-wrapper";
import { PasswordRequirements } from "@/components/auth/password-requirements";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
      .regex(/[a-z]/, { message: "Debe contener al menos una letra minúscula" })
      .regex(/[A-Z]/, { message: "Debe contener al menos una letra mayúscula" })
      .regex(/[0-9]/, { message: "Debe contener al menos un número" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Debe contener al menos un carácter especial",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordFormComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      const payload = {
        token,
        newPassword: data.password,
      };

      const response = await api.post("/auth/reset-password", payload);

      if (response.status === 200) {
        toast.success("Contraseña actualizada correctamente.");
        router.push("/login");
        form.reset();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message ||
          "Algo ha ido mal. Por favor, inténtelo de nuevo.";

        if (status === 401) {
          toast.error(
            "Credenciales no válidas. Por favor, vuelve a generar un nuevo token."
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
    <FormWrapper
      title="Establecer Nueva Contraseña"
      description="Crea una contraseña segura para proteger tu cuenta."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AnimatedInputWrapper
                    hasValue={Boolean(field.value)}
                    placeholder="Nueva contraseña"
                  >
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Nueva contraseña"
                      className="peer input-animated pr-10"
                      {...field}
                    />
                    {showPassword ? (
                      <EyeOff
                        onClick={() => setShowPassword(false)}
                        className="input-icon-toggle"
                      />
                    ) : (
                      <Eye
                        onClick={() => setShowPassword(true)}
                        className="input-icon-toggle"
                      />
                    )}
                  </AnimatedInputWrapper>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AnimatedInputWrapper
                    hasValue={Boolean(field.value)}
                    placeholder="Confirmar contraseña"
                  >
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirmar contraseña"
                      className="peer input-animated pr-10"
                      {...field}
                    />
                    {showConfirmPassword ? (
                      <EyeOff
                        onClick={() => setShowConfirmPassword(false)}
                        className="input-icon-toggle"
                      />
                    ) : (
                      <Eye
                        onClick={() => setShowConfirmPassword(true)}
                        className="input-icon-toggle"
                      />
                    )}
                  </AnimatedInputWrapper>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <PasswordRequirements password={form.watch("password") || ""} />

          <Button
            type="submit"
            variant="primary"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting && <Loader className="animate-spin" />}
            Actualizar contraseña
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
}

export default function ResetPasswordForm() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <ResetPasswordFormComponent />
        </Suspense>
    )
} 