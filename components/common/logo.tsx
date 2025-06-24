import React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { platformName } from "@/constants";

interface LogoProps {
  column?: boolean;
  showName?: boolean;
  logoClassname?: string;
  labelClassname?: string;
}

export function Logo({
  showName,
  column,
  logoClassname,
  labelClassname,
}: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", column && "flex-col")}>
      <Image
        src="/icons/logo.svg"
        alt="Logo"
        width={40}
        height={40}
        className={cn("h-10 w-auto obcject-contain", logoClassname)}
      />
      {showName && (
        <span className={cn("text-2xl font-bold text-primary", labelClassname)}>
          {platformName}{" "}
        </span>
      )}
    </div>
  );
}
