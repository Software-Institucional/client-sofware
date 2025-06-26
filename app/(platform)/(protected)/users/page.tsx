"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

import { fetchSchools } from "@/utils/schools";

import { School } from "@/types/school";

import { SchoolSidebar } from "@/components/dashboard/users/school-sidebar";
import { UsersContent } from "@/components/dashboard/users/users-content";

export default function UsersPage() {
  const limit = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  const { data: paginatedData, isLoading: isLoadingSchools } = useQuery({
    queryKey: ["schools", searchTerm, currentPage],
    queryFn: () => fetchSchools(searchTerm, currentPage, limit),
    retry: 2,
  });

  const schools = paginatedData?.schools ?? [];
  const totalPages = paginatedData?.totalPages ?? 1;

  useEffect(() => {
    if (schools.length > 0 && !selectedSchool) {
      setSelectedSchool(schools[0]);
    }
  }, [schools, selectedSchool]);

  return (
    <div className="h-[calc(100vh-theme(spacing.16))] flex flex-col">
      <div className="flex flex-col lg:flex-row h-full">
        <SchoolSidebar
          schools={schools}
          searchTerm={searchTerm}
          isLoadingSchools={isLoadingSchools}
          onSearch={setSearchTerm}
          selectedSchool={selectedSchool}
          onSelectSchool={setSelectedSchool}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

          <UsersContent
            schools={schools}
            selectedSchool={selectedSchool}
            isLoadingSchools={isLoadingSchools}
            onSchoolSelect={setSelectedSchool}
          />
      </div>
    </div>
  );
}
