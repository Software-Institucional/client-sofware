"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { School } from "@/types/school";
import { Button } from "@/components/ui/button";
import { SchoolInfo } from "./school-info";

import { useSchoolStore } from "@/stores/school-store";

interface SchoolSelectorProps {
  schools: School[];
}

export function SchoolSelector({ schools }: SchoolSelectorProps) {
  const [open, setOpen] = useState(false);

  const { selectedSchool, setSelectedSchool } = useSchoolStore();

  const selectedSchoolData = schools.find(
    (school) => school.id === selectedSchool?.id
  );

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-auto p-4 hover:bg-accent-foreground/5"
          >
            {selectedSchoolData ? (
              <div className="flex items-center gap-3 text-left">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="font-medium text-wrap">
                    {selectedSchoolData.name}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {selectedSchoolData.municipality},{" "}
                    {selectedSchoolData.department}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>Seleccionar colegio...</span>
              </div>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Buscar colegio..." />
            <CommandList>
              <CommandEmpty>No se encontraron colegios.</CommandEmpty>
              <CommandGroup>
                {schools.map((school) => (
                  <CommandItem
                    key={school.id}
                    value={school.name}
                    onSelect={() => {
                      const newSchool =
                        school.id === selectedSchool?.id ? null : school;
                      setSelectedSchool(newSchool ?? school);
                      setOpen(false);
                    }}
                    className="p-3"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <Check
                        className={cn(
                          "h-4 w-4",
                          selectedSchool?.id === school.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      <div className="flex flex-col flex-1">
                        <span className="font-medium">{school.name}</span>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {school.municipality}, {school.department}
                        </div>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedSchoolData && selectedSchool && (
        <SchoolInfo school={selectedSchool} />
      )}
    </div>
  );
}
