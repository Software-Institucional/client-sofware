"use client";

import { z } from "zod";
import api from "@/lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormWrapper } from "@/components/auth/form-wrapper";
import { AnimatedInputWrapper } from "@/components/auth/animated-input-wrapper";

const loginSchema = z.object({
  email: z.string().email({ message: "Correo inválido." }),
});

type ForgotPasswordFormValues = z.infer<typeof loginSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      const response = await api.post("/auth/forgot-password", data);

      if (response.status === 200) {
        toast.success(
          "Correo enviado. Por favor, revisa tu bandeja de entrada."
        );
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
            "Credenciales no válidas. Por favor, compruebe su correo electrónico."
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
      showBackButton
      backButtonClick={() => router.back()}
      title="Recuperar Contraseña"
      description="Ingresa tu email y te enviaremos un correo para restablecer tu contraseña."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AnimatedInputWrapper
                    hasValue={Boolean(field.value)}
                    placeholder="Correo electrónico"
                  >
                    <Input
                      type="email"
                      placeholder="Correo electrónico"
                      className="peer input-animated"
                      {...field}
                    />
                  </AnimatedInputWrapper>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="primary"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting && <Loader className="animate-spin" />}
            Enviar
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
}
