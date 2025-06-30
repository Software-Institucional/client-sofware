"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Building2,
} from "lucide-react";
import { School } from "@/types/school";
import { InstitutionCardSkeleton } from "../../skeletons/schools/institution-card-skeleton";
import { EmptyInstitutionsState } from "./empty-institution-state";

interface InstitutionsListProps {
  institutions: School[];
  onEdit: (institution: School) => void;
  onDelete: (institutionId: string) => void;
  loading?: boolean;
}

export function InstitutionsList({
  institutions,
  onEdit,
  onDelete,
  loading = false,
}: InstitutionsListProps) {
  if (loading) {
    return <InstitutionCardSkeleton />;
  }

  return (
    <>
      {institutions.length === 0 ? (
        // <div className="text-center py-8 text-muted-foreground">
        //   <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
        //   <p>No se encontraron instituciones</p>
        //   {/* <p className="text-sm">Intenta con otros términos de búsqueda</p> */}
        // </div>
        <EmptyInstitutionsState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {institutions.map((institution) => (
            <Card
              key={institution.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <img
                      src={institution.imgUrl || "/placeholder.svg"}
                      alt={institution.name}
                      className="w-12 h-12 rounded-lg object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "/placeholder.svg?height=48&width=48";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base line-clamp-2 mb-2">
                        {institution.name}
                      </CardTitle>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">
                          {institution.municipality}, {institution.department}
                        </span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onEdit(institution)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDelete(institution.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {institution.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground truncate">
                      {institution.mail}
                    </span>
                  </div>
                  {institution.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground truncate">
                        {institution.website}
                      </span>
                    </div>
                  )}
                </div>

                {/* Sedes */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Building2 className="h-4 w-4" />
                    <span>Sedes ({institution.sedes.length})</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
