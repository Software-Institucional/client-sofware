"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const visiblePages = getVisiblePages()

  return (
    <motion.div
      className="flex items-center justify-center gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Botón anterior */}
      <motion.button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg border transition-colors ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-50 hover:border-gray-400"
        }`}
        whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
        whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
      >
        <ChevronLeft className="w-4 h-4" />
      </motion.button>

      {/* Números de página */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => (
          <motion.div key={index}>
            {page === "..." ? (
              <span className="px-3 py-2 text-gray-400">...</span>
            ) : (
              <motion.button
                onClick={() => onPageChange(page as number)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-primary shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                whileHover={{ scale: currentPage !== page ? 1.05 : 1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                {page}
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Botón siguiente */}
      <motion.button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg border transition-colors ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-50 hover:border-gray-400"
        }`}
        whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
        whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
      >
        <ChevronRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  )
}
