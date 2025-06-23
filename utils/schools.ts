import { AxiosError } from "axios";

import api from "@/lib/axios";
import { School } from "@/types/school";
import { PaginatedResponse } from "@/types";

export const fetchSchools = async (
  name: string = "",
  page: number = 1,
  limit: number = 10
): Promise<{
  schools: School[];
  page: number;
  limit: number;
  totalPages: number;
}> => {
  try {
    const response = await api.get<PaginatedResponse>("/schools", {
      params: {
        name: name || undefined,
        page: page || undefined,
        limit: limit || undefined,
      },
    });

    const schools = response.data.schools.map((item) => item.school);
    return {
      schools,
      page: response.data.metadata.page,
      limit: response.data.metadata.limit,
      totalPages: Math.ceil(response.data.metadata.total / limit),
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data.message || "Error al obtener las escuelas"
      );
    }
    throw new Error("Error desconocido al obtener las escuelas");
  }
};
