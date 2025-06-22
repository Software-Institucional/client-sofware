import api from "@/lib/axios";

export async function refreshAccessToken(): Promise<boolean> {
  try {
    await api.get("/auth/refresh"); // The refreshToken goes in the HttpOnly cookie automatically.
    return true;
  } catch (error) {
    return false;
  }
}
