import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rutas públicas que NO deben verse si el usuario ya está logueado
const publicRoutes = ["/login", "/login/admin"];
const privateRoutes = ["/dashboard", "/admin"]; // aquí defines tus rutas protegidas

export function middleware(request: NextRequest) {
  // --- INICIO DEBUG EN PRODUCCIÓN ---
  console.log("--- Middleware Executing on:", request.url);

  // Intenta obtener el accessToken
  const accessToken = request.cookies.get("accessToken")?.value;
  console.log(
    "AccessToken from cookies:",
    accessToken ? "ENCONTRADO" : "NO ENCONTRADO"
  );

  // Muestra todas las cookies que el middleware puede ver
  const allCookies = request.cookies.getAll();
  console.log("Todas las cookies visibles:", JSON.stringify(allCookies, null, 2));
  // --- FIN DEBUG EN PRODUCCIÓN ---

  const pathname = request.nextUrl.pathname;

  const isPublicRoute = publicRoutes.includes(pathname);
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Usuario logueado intenta ir a login → lo mandamos al dashboard
  if (accessToken && isPublicRoute) {
    console.log("Redirigiendo a /dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Usuario NO logueado intenta acceder a una ruta privada
  if (!accessToken && isPrivateRoute) {
    console.log("Redirigiendo a /login/admin");
    return NextResponse.redirect(new URL("/login/admin", request.url));
  }

  console.log("No se necesita redirección.");
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/login/admin", "/dashboard/:path*", "/admin/:path*"],
};
