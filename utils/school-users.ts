import { AxiosError, AxiosResponse } from "axios";

import api from "@/lib/axios";
import { School } from "@/types/school";
import { User } from "@/types/school-users";

interface SchoolWithUsers {
  school: School;
  users: User[];
}

interface ApiResponse {
  schools: SchoolWithUsers[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function fetchSchoolUsers(
  schoolId: string,
  page: number,
  limit: number
): Promise<{
  users: User[];
  page: number;
  limit: number;
  totalPages: number;
}> {
  try {
    const response: AxiosResponse<ApiResponse> = await api.get(
      `auth/view-registered`,
      {
        params: {
          schoolId,
          page,
          limit,
        },
      }
    );

    const data = response.data;
    const schoolWithUsers = data.schools.find((s) => s.school.id === schoolId);

    return {
      users: schoolWithUsers?.users || [],
      page: data.metadata.page || page,
      limit: data.metadata.limit || limit,
      totalPages: data.metadata.totalPages || 1,
    };
  } catch (error) {
    console.error("Error fetching school users:", error);
    if (error instanceof AxiosError) {
      console.error("Axios error details:", error.response?.data);
    }
    return {
      users: [],
      page,
      limit,
      totalPages: 1,
    };
  }
}
