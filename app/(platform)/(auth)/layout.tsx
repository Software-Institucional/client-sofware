import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[100dvh] bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 relative overflow-y-auto">
      {/* Simplified decorative elements */}
      <div className="absolute top-32 left-8 w-12 h-12 bg-primary rounded-full opacity-40"></div>
      <div className="absolute top-48 left-32 w-6 h-6 border-2 border-primary rounded-full"></div>
      <div className="absolute bottom-32 right-32 w-8 h-8 bg-primary rounded-lg opacity-50"></div>
      <div className="absolute bottom-48 right-8 w-6 h-6 border-2 border-primary rounded-full"></div>

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

      <div className="flex flex-col justify-center items-center min-h-full overflow-hidden relative p-4">
        {children}
      </div>
    </div>
  );
}
