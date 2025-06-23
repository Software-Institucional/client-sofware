"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { School } from "@/types/school";

interface SchoolCardProps {
  school: School;
  index: number;
  onSelect: (school: School) => void;
}

export function SchoolCard({ school, index, onSelect }: SchoolCardProps) {
  return (
    <motion.div
      className="bg-transparent rounded-lg shadow-md hover:shadow-lg border cursor-pointer overflow-hidden transition-all"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: "linear" }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(school)}
    >
      <div className="p-4 text-center">
        {/* School logo */}
        <div className="relative size-24 mx-auto mb-3 rounded-lg overflow-hidden">
          <Image
            src={school.imgUrl}
            alt={`Escudo de ${school.name}`}
            fill
            className="object-contain"
          />
        </div>

        <h3 className="text-sm font-semibold mb-1 line-clamp-2 leading-tight">
          {school.name}
        </h3>

        <p className="text-xs text-gray-500 dark:text-gray-400/80 capitalize mb-2">
          {school.municipality}
        </p>
      </div>
    </motion.div>
  );
}
