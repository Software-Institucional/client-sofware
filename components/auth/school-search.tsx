"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

import type { School } from "@/types/school";
import { Input } from "@/components/ui/input";
import { fetchSchools } from "@/utils/schools";
import { SchoolCard } from "@/components/schools/school-card";
import { Logo } from "../common/logo";
import { Pagination } from "../common/pagination";
import { SchoolCardSkeleton } from "../skeletons/schools/school-card-skeleton";

interface SchoolSearchProps {
  onSchoolSelect: (school: School) => void;
  onBack: () => void;
}

export function SchoolSearch({ onSchoolSelect, onBack }: SchoolSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 10;

  const {
    data: paginatedData,
    isLoading,
    error,
  } = useQuery<
    {
      schools: School[];
      page: number;
      limit: number;
      totalPages: number;
    },
    Error
  >({
    queryKey: ["schools", searchTerm, currentPage],
    queryFn: () => fetchSchools(searchTerm, currentPage, limit),
    retry: 2,
  });

  const totalPages = paginatedData?.totalPages || 1;
  const schools = paginatedData ? paginatedData.schools : [];

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <motion.div
      className="w-full min-h-[100dvh] max-w-2xl mx-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col bg-white rounded-2xl min-h-screen shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="pb-3">
            <Logo showName column />
          </div>
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-black mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            Selecciona tu Colegio
          </motion.h2>
          <motion.p
            className="text-gray-600 text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Busca y selecciona la institución educativa
            <br />
            donde trabajas como docente
          </motion.p>
        </div>

        <motion.div
          className="relative mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Buscar por nombre, municipio o departamento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </motion.div>

        <div className="flex flex-col justify-between flex-1 h-full">
          <div className="space-y-3">
            {/* <AnimatePresence mode="wait"> */}
            {isLoading ? (
              <motion.div
                key="loading"
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {Array.from({ length: limit }).map((_, index) => (
                  <SchoolCardSkeleton key={index} index={index} />
                ))}
              </motion.div>
            ) : schools && schools.length > 0 ? (
              <motion.div
                key="schools-list"
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {schools.map((school, index) => (
                  <SchoolCard
                    key={school.id}
                    school={school}
                    index={index}
                    onSelect={onSchoolSelect}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <p className="text-lg text-gray-500 mb-2">
                  No se encontraron colegios
                </p>
                <p className="text-sm text-gray-400">
                  Intenta con otros términos de búsqueda
                </p>
              </motion.div>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-6">
            <div className="mt-6 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
