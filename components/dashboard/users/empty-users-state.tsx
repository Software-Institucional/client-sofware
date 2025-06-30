import { Users } from "lucide-react";
import React from "react";

export function EmptyUsersState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 max-lg:bg-input/30 rounded-lg lg:h-full w-full">
      <div className="bg-muted p-4 rounded-full mb-4">
        <Users className="w-8 h-8 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold">No se encontraron usuarios</h2>
    </div>
  );
}
