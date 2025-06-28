"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, MapPin, Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

import { School } from "@/types/school";

interface SedeComboboxProps {
  selectedSchool: School
  value: string | undefined;
  onChange: (value: string) => void;
}

export function SedeSelector({ selectedSchool, value, onChange }: SedeComboboxProps) {
  const [open, setOpen] = useState(false);

  const sedes = selectedSchool!.sedes;
  const selectedSede = selectedSchool!.sedes.find((sede) => sede.id === value);

  const handleSelect = (sedeId: string) => {
    onChange(sedeId);
  };

  return (
    <>
      <div className="space-y-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between bg-input/30 h-auto p-3"
            >
              {selectedSede ? (
                <div className="flex items-center gap-3 text-left">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-col gap-1.5">
                    <span className="font-medium">{selectedSede.name}</span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {selectedSede.address}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>Seleccionar sede...</span>
                </div>
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="min-w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Buscar sede..." />
              <CommandList>
                <CommandEmpty>No se encontraron sedes.</CommandEmpty>
                <CommandGroup>
                  {sedes.map((sede) => (
                    <CommandItem
                      key={sede.id}
                      value={sede.name}
                      onSelect={() => handleSelect(sede.id)}
                      className="p-3"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <Check
                          className={cn(
                            "h-4 w-4",
                            selectedSede?.id === sede.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <div className="flex flex-col flex-1">
                          <span className="font-medium">{sede.name}</span>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3" />
                            {sede.address}
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
      </div>
    </>
  );
}
