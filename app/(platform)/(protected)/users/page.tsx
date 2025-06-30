"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { fetchSchools } from "@/utils/schools";

import { SchoolSidebar } from "@/components/dashboard/users/school-sidebar";
import { UsersContent } from "@/components/dashboard/users/users-content";

import { useSchoolStore } from "@/stores/school-store";
import { EmptyUsersState } from "@/components/dashboard/users/empty-users-state";

export default function UsersPage() {
  const limit = 10;

  const { selectedSchool, setSelectedSchool, currentPage, setCurrentPage } =
    useSchoolStore();

  const [searchTerm, setSearchTerm] = useState("");

  const { data: paginatedData, isLoading: isLoadingSchools } = useQuery({
    queryKey: ["schools", searchTerm, currentPage],
    queryFn: () => fetchSchools(searchTerm, currentPage, limit),
    retry: 2,
  });

  const schools = paginatedData?.schools ?? [];
  const totalPages = paginatedData?.totalPages ?? 1;

  // Auto-select the first school if one is not already selected
  useEffect(() => {
    if (schools.length > 0 && !selectedSchool) {
      setSelectedSchool(schools[0]);
    }
  }, [schools, selectedSchool, setSelectedSchool]);

  return (
    <div className="h-[calc(100vh-theme(spacing.16))] flex flex-col max-sm:pb-10">
      <div className="flex flex-col lg:flex-row h-full">
        <SchoolSidebar
          schools={schools}
          searchTerm={searchTerm}
          isLoadingSchools={isLoadingSchools}
          onSearch={setSearchTerm}
          selectedSchool={selectedSchool}
          onSelectSchool={(school) => {
            setSelectedSchool(school);
          }}
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
