import { School, SchoolData } from "./school";

export interface PaginatedResponse {
  schools: SchoolData[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
