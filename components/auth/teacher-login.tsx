"use client";

import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import api from "@/lib/axios";
import { School } from "@/types/school";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import { FormWrapper } from "@/components/auth/form-wrapper";
import { AnimatedInputWrapper } from "@/components/auth/animated-input-wrapper";
import { useInstitutionStore } from "@/stores/institution-store";

interface TeacherLoginProps {
  school: School;
  handleBackToSearch: () => void;
}

const loginSchema = z.object({
  email: z.string().email({ message: "Correo inválido." }),
  password: z.string().min(1, { message: "La contraseña es obligatoria." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function TeacherLogin({
  school,
  handleBackToSearch,
}: TeacherLoginProps) {
  const router = useRouter();
  const setSchool = useInstitutionStore((state) => state.setInstitution);

  const [showPassword, setShowPassword] = useState(false);

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
      const payload = {
        schoolId: school.id,
        email: data.email,
        password: data.password,
      };

      const response = await api.post("/auth/login", payload);

      const result = response.data;
      setUser(result.user);
      setSchool(school); // guarda todo el objeto School

      router.replace("/dashboard");
      form.reset();
    } catch (error) {
      console.log(error)
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
    <FormWrapper
      showBackButton
      schoolLogoUrl={school.imgUrl}
      backButtonClick={handleBackToSearch}
      title={school.name}
      description="Ingresa tus credenciales para acceder al sistema educativo."
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AnimatedInputWrapper
                    hasValue={Boolean(field.value)}
                    placeholder="Contraseña"
                  >
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Contraseña"
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

          <Link
            href="/forgot-password"
            className="block text-sm text-muted-foreground hover:underline hover:text-primary transition-colors w-fit ml-auto"
          >
            ¿Olvidaste tu contraseña?
          </Link>

          <Button
            type="submit"
            variant="primary"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting && <Loader className="animate-spin" />}
            Iniciar sesión
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
}
