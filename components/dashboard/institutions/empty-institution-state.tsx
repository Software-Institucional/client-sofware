import { Building2 } from "lucide-react";

export function EmptyInstitutionsState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 h-full">
      <div className="bg-muted p-4 rounded-full mb-4">
        <Building2 className="w-8 h-8 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold">No se encontraron instituciones</h2>
    </div>
  );
}
