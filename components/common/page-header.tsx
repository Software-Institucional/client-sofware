import React from "react";

import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      <h1 className="text-3xl font-bold tracking-tight lg:max-w-3xl">
        {title}
      </h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
