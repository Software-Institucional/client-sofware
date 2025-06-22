import React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { platformName } from "@/constants";

interface LogoProps {
  column?: boolean;
  showName?: boolean;
}

export function Logo({ showName, column }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", column && "flex-col")}>
      <Image
        src="/icons/logo.svg"
        alt="Logo"
        width={40}
        height={40}
        className="h-10 w-auto obcject-contain"
      />
      {showName && (
        <span className="text-2xl font-bold text-black">{platformName} </span>
      )}
    </div>
  );
}
