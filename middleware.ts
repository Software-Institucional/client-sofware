import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rutas públicas que NO deben verse si el usuario ya está logueado
const publicRoutes = ["/login", "/login/admin"];
const privateRoutes = ["/dashboard", "/admin"]; // aquí defines tus rutas protegidas

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  console.log("Token: ",request.cookies)

  const pathname = request.nextUrl.pathname;

  const isPublicRoute = publicRoutes.includes(pathname);
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Usuario logueado intenta ir a login → lo mandamos al dashboard
  if (accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Usuario NO logueado intenta acceder a una ruta privada
  if (!accessToken && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/login/admin", "/dashboard/:path*", "/admin/:path*"],
};
