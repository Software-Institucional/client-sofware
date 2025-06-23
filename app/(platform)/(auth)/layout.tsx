import Link from "next/link";
import Image from "next/image";

import { platformName } from "@/constants";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 relative overflow-hidden py-12">
      {/* Simplified decorative elements */}
      <div className="absolute top-32 left-8 w-12 h-12 bg-blue-100 rounded-full opacity-40" />
      <div className="absolute top-48 left-32 w-6 h-6 border-2 border-blue-200 rounded-full" />
      <div className="absolute bottom-32 right-32 w-8 h-8 bg-blue-200 rounded-lg opacity-50" />
      <div className="absolute bottom-48 right-8 w-6 h-6 border-2 border-blue-300 rounded-full" />

      {/* Additional illustration placeholders for decorative elements */}
      <div className="absolute right-0 bottom-0 lg:block hidden">
        <div className="relative flex w-[350px] xl:w-[400px] h-[200px]">
          <Image
            src="/images/education-widget.svg"
            alt="Login Widget"
            fill
            className="size-auto object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center min-h-[100dvh] z-10 relative">
        {children}

        {/* Footer */}
        <footer className="text-center py-4 text-sm text-gray-600">
          Copyright @{platformName} {new Date().getFullYear()} |
          <Link href="#" className="hover:underline ml-1">
            Politicas de privacidad
          </Link>
        </footer>
      </div>
    </div>
  );
}
