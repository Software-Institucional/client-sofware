// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // Public routes that should NOT be seen if the user is already logged in.
// const publicRoutes = ["/login", "/login/admin", "/reset-password"];

// // Private routes that require authentication.
// const privateRoutes = [
//   "/dashboard",
//   "/config",
//   "/users",
//   "/institutions",
//   "/admin",
// ];

// export function middleware(request: NextRequest) {
//   const accessToken = request.cookies.get("accessToken")?.value;
//   const pathname = request.nextUrl.pathname;

//   const isPublicRoute = publicRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   const isPrivateRoute = privateRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   // Si el usuario está logueado y va a una ruta pública → redirigir al dashboard
//   if (accessToken && isPublicRoute) {
//     console.log("Redirigiendo a /dashboard");
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // Si el usuario NO está logueado e intenta ir a una ruta privada → redirigir a login
//   if (!accessToken && isPrivateRoute) {
//     console.log("Redirigiendo a /login");
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   console.log("No se necesita redirección.");
//   return NextResponse.next();
// }

// // export const config = {
// //   matcher: [
// //     // solo las rutas que nos interesan
// //     "/dashboard/:path*",
// //     "/admin/:path*",
// //     "/login",
// //     "/login/admin",
// //     "/reset-password",
// //   ],
// // };

// export const config = {
//   matcher: ["/((?!_next|api|favicon.ico).*)"], // aplica a todo excepto rutas técnicas
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
import api from "./lib/axios";

// Public routes that should NOT be seen if the user is already logged in.
const publicRoutes = ["/login", "/login/admin", "/reset-password"];

// Private routes that require authentication.
const privateRoutes = [
  "/dashboard",
  "/config",
  "/users",
  "/institutions",
  "/admin",
];

// URL del endpoint para refrescar el token (ajusta según tu backend)
const REFRESH_TOKEN_URL = "/auth/refresh";

async function refreshAccessToken() {
  try {
    await api.post(REFRESH_TOKEN_URL);
    return true; // Indica que la renovación fue exitosa
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  let refreshToken = request.cookies.get("refreshToken")?.value;
  const pathname = request.nextUrl.pathname;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Si el usuario está logueado (accessToken válido) y va a una ruta pública → redirigir al dashboard
  if (accessToken && isPublicRoute) {
    console.log("Redirigiendo a /dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Si no hay accessToken o está vencido, intentar renovarlo
  if (!accessToken && refreshToken && isPrivateRoute) {
    // Eliminar el refreshToken anterior para evitar residuos
    const response = NextResponse.next();

    const refreshSuccess = await refreshAccessToken();

    if (refreshSuccess) {
      console.log("Token renovado exitosamente");
      return response; // Continuar, ya que el backend establece las cookies
    } else {
      // Si no se pudo renovar el token, redirigir al login
      console.log("No se pudo renovar el token, redirigiendo a /login");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Si no hay accessToken ni refreshToken y se intenta acceder a una ruta privada → redirigir a login
  if (!accessToken && !refreshToken && isPrivateRoute) {
    console.log("Redirigiendo a /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Si no se necesita redirección, continuar con la solicitud
  console.log("No se necesita redirección.");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"], // Aplica a todo excepto rutas técnicas
};
