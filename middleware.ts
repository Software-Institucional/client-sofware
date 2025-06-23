import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes that should NOT be seen if the user is already logged in.
const publicRoutes = ["/login", "/login/admin", "/reset-password", "/dashboard"];

// Private routes that require authentication.
const privateRoutes = ["/admin"];

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const pathname = request.nextUrl.pathname;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Si el usuario está logueado y va a una ruta pública → redirigir al dashboard
  if (accessToken && isPublicRoute) {
    console.log("Redirigiendo a /dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Si el usuario NO está logueado e intenta ir a una ruta privada → redirigir a login
  if (!accessToken && isPrivateRoute) {
    console.log("Redirigiendo a /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("No se necesita redirección.");
  return NextResponse.next();
}

export const config = {
  matcher: [
    // solo las rutas que nos interesan
    "/dashboard/:path*",
    "/admin/:path*",
    "/login",
    "/login/admin",
    "/reset-password",
  ],
};
