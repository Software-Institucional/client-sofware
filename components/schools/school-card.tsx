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
      className="bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-100 cursor-pointer overflow-hidden transition-all"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: "linear" }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(school)}
    >
      <div className="p-4 text-center">
        {/* Escudo prominente */}
        <div className="relative size-24 mx-auto mb-3 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={school.imgUrl}
            alt={`Escudo de ${school.name}`}
            fill
            className="object-cover"
          />
        </div>

        {/* Nombre del colegio */}
        <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 leading-tight">
          {school.name}
        </h3>

        {/* Ubicación */}
        <p className="text-xs text-gray-500 capitalize mb-2">
          {school.municipality}
        </p>
      </div>
    </motion.div>
  );
}
