"use client";

import { ArrowLeft, GraduationCap } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface FormWrapperProps {
  title: string;
  description?: string;
  showBackButton?: boolean;
  schoolLogoUrl?: string;
  backButtonClick?: () => void;
  children?: React.ReactNode;
}

export function FormWrapper({
  title,
  description,
  schoolLogoUrl,
  showBackButton,
  children,
  backButtonClick,
}: FormWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();

  const footerButtonLabel =
    pathname === "/login/admin"
      ? "Ingresar como Docente"
      : "Ingresar como Administrador";

  const handleRedirect = () => {
    router.push(pathname === "/login/admin" ? "/login" : "/login/admin");
  };

  const showFooter = pathname.startsWith("/login/admin");

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8 w-full max-w-md mx-4">
      {!schoolLogoUrl && (
        <div className="pb-8 flex items-center justify-center">
          <Logo column showName />
        </div>
      )}
      {schoolLogoUrl && (
        <div className="relative size-20 mx-auto mb-3 rounded-lg overflow-hidden">
          <Image
            src={schoolLogoUrl}
            alt={`Escudo del colegio`}
            fill
            className="object-contain"
          />
        </div>
      )}
      <div className="flex flex-col items-center justify-center text-center mb-8">
        <h2 className="text-xl sm:text-2xl tracking-tight font-bold mb-2">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-accent-foreground/45 max-w-xs">{description}</p>
      </div>
      {children}

      {/* back button */}
      {showBackButton && (
        <div className="mt-6">
          <Button variant="primaryOutline" onClick={backButtonClick}>
            <ArrowLeft />
            Volver
          </Button>
        </div>
      )}

      {/* Footer section */}
      {showFooter && (
        <>
          {/* Divider */}
          <div className="my-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-neutral-800 text-gray-500 dark:text-neutral-500">O</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6">
            <Button variant="primaryOutline" onClick={handleRedirect}>
              <GraduationCap />
              {footerButtonLabel}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
