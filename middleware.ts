import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes that should NOT be seen if the user is already logged in.
const publicRoutes = ["/login", "/login/admin"];

// Private routes that require authentication.
const privateRoutes = ["/dashboard", "/admin"];

export function middleware(request: NextRequest) {
  // --- INICIO DEBUG EN PRODUCCIÓN ---
  console.log("--- Middleware Executing on:", request.url);

  // Intenta obtener el accessToken
  const accessToken = request.cookies.get("accessToken")?.value;
  console.log(
    "AccessToken from cookies:",
    accessToken ? "ENCONTRADO" : "NO ENCONTRADO"
  );

  // Displays all cookies that the middleware can see
  const allCookies = request.cookies.getAll();
  console.log(
    "Todas las cookies visibles:",
    JSON.stringify(allCookies, null, 2)
  );
  // --- FIN DEBUG EN PRODUCCIÓN ---

  const pathname = request.nextUrl.pathname;

  const isPublicRoute = publicRoutes.includes(pathname);
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Logged in user tries to go to login → send to dashboard
  if (accessToken && isPublicRoute) {
    console.log("Redirigiendo a /dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // User NOT logged in tries to access a private route
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
