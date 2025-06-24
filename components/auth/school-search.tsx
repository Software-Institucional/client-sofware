"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import type { School } from "@/types/school";
import { Input } from "@/components/ui/input";
import { fetchSchools } from "@/utils/schools";
import { Logo } from "@/components/common/logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pagination } from "@/components/common/pagination";
import { SchoolCard } from "@/components/schools/school-card";
import { SchoolCardSkeleton } from "@/components/skeletons/schools/school-card-skeleton";

interface SchoolSearchProps {
  onSchoolSelect: (school: School) => void;
}

export function SchoolSearch({ onSchoolSelect }: SchoolSearchProps) {
  const limit = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: paginatedData, isLoading } = useQuery<
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

  return (
    <motion.div
      className="w-full max-w-xl lg:max-w-6xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg overflow-hidden">
        {/* Header - Only movile */}
        <div className="text-center my-6 pt-8 block lg:hidden">
          <div className="flex justify-center pb-10">
            <Logo showName column />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            Selecciona tu Colegio
          </h2>
          <p className="text-gray-600 dark:text-accent-foreground/45 text-sm">
            Busca y selecciona la institución educativa
            <br />
            donde trabajas como docente
          </p>
        </div>

        {/* Search input - Only movile */}
        <div className="relative mb-6 block lg:hidden mx-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Nombre del colegio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 bg-accent"
          />
        </div>

        <div className="lg:grid lg:grid-cols-12">
          {/* Left panel - Only desktop */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-3 bg-gray-50 dark:bg-neutral-700 p-6">
            <div className="sticky top-6">
              <div className="pb-10">
                <Logo showName column={false} />
              </div>

              <h3 className="text-lg font-semibold mb-4">Buscar Institución</h3>

              {/* Search input - Desktop */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Nombre del colegio..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 bg-white"
                />
              </div>

              {/* Stats */}
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-500/20 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
                  Resultados
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  {schools.length} colegio{schools.length !== 1 ? "s" : ""}{" "}
                  encontrado
                  {schools.length !== 1 ? "s" : ""}
                </p>
                {totalPages > 1 && (
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    Página {currentPage} de {totalPages}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right panel - Results */}
          <div className="lg:col-span-8 xl:col-span-9 p-6 lg:p-8">
            {/* Information about results - Only mobile */}
            <div className="lg:hidden flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600 dark:text-accent-foreground/45">
                {schools.length > 0
                  ? `${schools.length} colegio${
                      schools.length !== 1 ? "s" : ""
                    } encontrado${schools.length !== 1 ? "s" : ""}`
                  : "No se encontraron colegios"}
              </p>
              {totalPages > 1 && (
                <p className="text-sm text-gray-500 dark:text-accent-foreground/45">
                  Página {currentPage} de {totalPages}
                </p>
              )}
            </div>

            {/* Header - Only desktop */}
            <div className="text-center mb-8 hidden lg:block">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                Selecciona tu Colegio
              </h2>
              <p className="text-gray-600 dark:text-accent-foreground/45 text-sm">
                Busca y selecciona la institución educativa
                <br />
                donde trabajas como docente
              </p>
            </div>

            {/* Grid results */}
            <ScrollArea className="h-[60vh] pr-2">
              <div
                className={cn(
                  "py-5",
                  schools.length === 0 && "grid-cols-1 xl:grid-cols-1"
                )}
              >
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
                ) : schools.length > 0 ? (
                  <motion.div
                    key={`page-${currentPage}`}
                    className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
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
                    className="text-center py-16"
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
                    <p className="text-lg mb-2">No se encontraron colegios</p>
                    <p className="text-sm text-gray-400 dark:text-accent-foreground/45">
                      Intenta con otros términos de búsqueda
                    </p>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
