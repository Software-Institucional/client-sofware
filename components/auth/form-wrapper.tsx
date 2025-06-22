"use client";

import { GraduationCap } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";

interface FormWrapperProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function FormWrapper({
  title,
  description,
  children,
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

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md mx-4">
      <div className="pb-8 flex items-center justify-center">
        <Logo column showName />
      </div>
      <div className="flex flex-col items-center justify-center text-center mb-8">
        <h2 className="text-2xl sm:text-[28px] tracking-tight font-bold text-black mb-2">
          {title}
        </h2>
        <p className="text-gray-600 max-w-xs">{description}</p>
      </div>
      {children}

      {/* Divider */}
      <div className="my-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">O</span>
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
    </div>
  );
}
