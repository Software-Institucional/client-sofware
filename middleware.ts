import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/login/admin", "/reset-password"];
const privateRoutes = [
  "/dashboard",
  "/config",
  "/users",
  "/institutions",
  "/admin",
];

async function refreshTokenServer(request: NextRequest) {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://api.eduadminsoft.shop";
    const res = await fetch(`${apiUrl}/auth/refresh`, {
      method: "GET",
      headers: {
        Cookie: request.headers.get("cookie") || "",
      },
      credentials: "include",
    });

    if (!res.ok) return { success: false };

    const setCookieHeader = res.headers.get("set-cookie");
    const data = await res.json();

    return {
      success: true,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      setCookieHeader,
    };
  } catch {
    return { success: false };
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const { accessToken, refreshToken } = {
    accessToken: request.cookies.get("accessToken")?.value,
    refreshToken: request.cookies.get("refreshToken")?.value,
  };

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isPrivateRoute) {
    if (!accessToken && refreshToken) {
      const refreshResult = await refreshTokenServer(request);
      if (refreshResult.success && refreshResult.setCookieHeader) {
        const response = NextResponse.next();
        response.headers.set("set-cookie", refreshResult.setCookieHeader);
        return response;
      } else {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");
        return response;
      }
    }

    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
