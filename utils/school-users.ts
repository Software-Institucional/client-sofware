import { AxiosError, AxiosResponse } from "axios";

import api from "@/lib/axios";
import { User } from "@/types/school-users";

interface ApiResponse {
  users: User[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    activos: number;
    cantidadSedes: number;
    docentes: number;
    totalUsers: number;
  };
}

export async function fetchSchoolUsers(
  schoolId: string,
  page: number,
  limit: number,
  searchQuery: string,
  filters: {
    role: string[];
    activate: string[];
    isEmailVerified: string[];
  }
): Promise<{
  users: User[];
  page: number;
  limit: number;
  totalPages: number;
  totalUsers: number;
  teachers: number;
  totalSedes: number;
  activeUsers: number;
}> {
  try {
    console.log("Fn filters: ", filters)
    const response = await api.get(`/auth/view-registered`, {
      params: {
        schoolId,
        page,
        limit,
        search: searchQuery,
        role: filters.role,
        activate: filters.activate,
        isEmailVerified: filters.isEmailVerified,
      },
      paramsSerializer: (params) => {
        const query = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => query.append(key, v));
          } else if (value !== undefined) {
            query.append(key, String(value));
          }
        });
        return query.toString();
      },
    });

    const data = response.data;

    if (!Array.isArray(data.users)) {
      throw new Error(
        "La propiedad 'users' no está presente o no es un array."
      );
    }

    return {
      users: data?.users || [],
      page: data.metadata.page || page,
      limit: data.metadata.limit || limit,
      totalPages: data.metadata.totalPages || 1,
      totalUsers: data.metadata.totalUsers,
      totalSedes: data.metadata.cantidadSedes,
      activeUsers: data.metadata.activos,
      teachers: data.metadata.docentes,
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
      totalUsers: 0,
      totalSedes: 0,
      activeUsers: 0,
      teachers: 0,
    };
  }
}
// export async function fetchSchoolUsers(
//   schoolId: string,
//   page: number,
//   limit: number,
//    searchQuery: string,
//   filters: {
//     role: string[];
//     activate: string[];
//     isEmailVerified: string[];
//   }
// ): Promise<{
//   users: User[];
//   page: number;
//   limit: number;
//   totalPages: number;
//   totalUsers: number;
//   teachers: number;
//   totalSedes: number;
//   activeUsers: number;
// }> {
//   try {
//     const response: AxiosResponse<ApiResponse> = await api.get(
//       `/auth/view-registered`,
//       {
//         params: {
//           schoolId,
//           page,
//           limit,
//         },
//       }
//     );

//     const data = response.data;

//     if (!Array.isArray(data.users)) {
//       throw new Error(
//         "La propiedad 'users' no está presente o no es un array."
//       );
//     }

//     return {
//       users: data?.users || [],
//       page: data.metadata.page || page,
//       limit: data.metadata.limit || limit,
//       totalPages: data.metadata.totalPages || 1,
//       totalUsers: data.metadata.totalUsers,
//       totalSedes: data.metadata.cantidadSedes,
//       activeUsers: data.metadata.activos,
//       teachers: data.metadata.docentes,
//     };
//   } catch (error) {
//     console.error("Error fetching school users:", error);
//     if (error instanceof AxiosError) {
//       console.error("Axios error details:", error.response?.data);
//     }
//     return {
//       users: [],
//       page,
//       limit,
//       totalPages: 1,
//       totalUsers: 0,
//       totalSedes: 0,
//       activeUsers: 0,
//       teachers: 0,
//     };
//   }
// }
