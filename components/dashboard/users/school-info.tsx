import Link from "next/link";
import { Link2, Mail, MapPin, Phone } from "lucide-react";

import { School } from "@/types/school";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SchoolInfoProps {
  school: School;
  className?: string;
}

export function SchoolInfo({ school, className }: SchoolInfoProps) {
  return (
    <div
      className={cn(
        "bg-accent dark:bg-input/30 border rounded-lg p-4 space-y-3",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <img
          src={school.imgUrl}
          alt={school.name}
          className="w-16 h-16 rounded-lg object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg?height=64&width=64";
          }}
        />
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold text-lg">{school.name}</h3>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <div className="min-w-0 space-y-2">
              <div className="flex items-start gap-2 w-full">
                <MapPin className="size-4 shrink-0 mt-1" />
                {school.address}
              </div>
              <div className="flex items-center gap-2 w-full">
                <Phone className="size-4 shrink-0" /> {school.phone}
              </div>
            </div>
            <div className="min-w-0 space-y-2">
              <div className="flex items-center gap-2 w-full">
                <Mail className="size-4 shrink-0" /> {school.mail}
              </div>
              <Link
                target="_blank"
                href={school.website}
                className="flex items-center gap-2 hover:underline transition-all w-full"
              >
                <Link2 className="size-4 shrink-0" /> {school.website}
              </Link>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Badge variant="secondary">{school.department}</Badge>
            <Badge variant="outline">{school.municipality}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
