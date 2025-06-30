"use clent";

import React from "react";
import { MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import { School } from "@/types/school";
import { Button } from "@/components/ui/button";

interface SidebarSchoolItemProps {
  school: School;
  selectedSchool: School | null;
  onSelectSchool: (school: School) => void;
}

export function SidebarSchoolItem({
  school,
  selectedSchool,
  onSelectSchool,
}: SidebarSchoolItemProps) {
  return (
    <Button
      variant={selectedSchool?.id === school.id ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start h-auto p-3 text-left hover:bg-neutral-200 dark:hover:bg-secondary",
        selectedSchool?.id === school.id && "bg-neutral-200 dark:bg-secondary"
      )}
      onClick={() => onSelectSchool(school)}
    >
      <div className="flex items-start gap-3 w-full">
        <img
          src={school.imgUrl || "/placeholder.svg"}
          alt={school.name}
          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg?height=40&width=40";
          }}
        />
        <div className="flex-1 min-w-0">
          <h3 className="uppercase font-medium text-xs text-wrap line-clamp-2 mb-1">
            {school.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">
              {school.municipality.toUpperCase()}, {school.department}
            </span>
          </div>
        </div>
      </div>
    </Button>
  );
}
