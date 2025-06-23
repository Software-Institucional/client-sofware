"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  index: number;
}

export function SchoolCardSkeleton({ index }: Props) {
  return (
    <motion.div
      className="bg-transparent rounded-lg shadow-md border overflow-hidden transition-all"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: "linear" }}
    >
      <div className="p-4 text-center">
        <div className="relative size-24 mx-auto mb-3 rounded-lg overflow-hidden bg-accent-foreground/20">
          <Skeleton className="w-full h-full" />
        </div>
        <Skeleton className="h-4 w-32 mx-auto mb-2 bg-accent-foreground/20" />
        <Skeleton className="h-3 w-20 mx-auto bg-accent-foreground/20" />
      </div>
    </motion.div>
  );
}
