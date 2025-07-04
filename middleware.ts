// import { NextRequest, NextResponse } from "next/server";

// const publicRoutes = ["/login", "/login/admin", "/reset-password"];
// const privateRoutes = [
//   "/dashboard",
//   "/config",
//   "/users",
//   "/institutions",
//   "/admin",
// ];

// const rolePermissions: Record<string, string[]> = {
//   DOCENTE: ["/dashboard", "/config"], // rutas permitidas para DOCENTE
//   ADMIN: ["/dashboard", "/config", "/users"], // ADMIN no puede entrar a /admin
//   SUPER: ["/dashboard", "/config", "/users", "/institutions"],
// };

// async function refreshTokenServer(request: NextRequest) {
//   try {
//     const apiUrl =
//       process.env.NEXT_PUBLIC_API_URL || "https://api.eduadminsoft.shop";
//     const res = await fetch(`${apiUrl}/auth/refresh`, {
//       method: "GET",
//       headers: {
//         Cookie: request.headers.get("cookie") || "",
//       },
//       credentials: "include",
//     });

//     if (!res.ok) return { success: false };

//     const setCookieHeader = res.headers.get("set-cookie");
//     const data = await res.json();

//     return {
//       success: true,
//       accessToken: data.accessToken,
//       refreshToken: data.refreshToken,
//       setCookieHeader,
//     };
//   } catch {
//     return { success: false };
//   }
// }

// export async function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;
//   const isPublicRoute = publicRoutes.some((route) =>
//     pathname.startsWith(route)
//   );
//   const isPrivateRoute = privateRoutes.some((route) =>
//     pathname.startsWith(route)
//   );
//   const { accessToken, refreshToken } = {
//     accessToken: request.cookies.get("accessToken")?.value,
//     refreshToken: request.cookies.get("refreshToken")?.value,
//   };

//   if (isPublicRoute && accessToken) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   if (isPrivateRoute) {
//     if (!accessToken && refreshToken) {
//       const refreshResult = await refreshTokenServer(request);
//       if (refreshResult.success && refreshResult.setCookieHeader) {
//         const response = NextResponse.next();
//         response.headers.set("set-cookie", refreshResult.setCookieHeader);
//         return response;
//       } else {
//         const response = NextResponse.redirect(new URL("/login", request.url));
//         response.cookies.delete("accessToken");
//         response.cookies.delete("refreshToken");
//         return response;
//       }
//     }

//     if (!accessToken && !refreshToken) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next|api|favicon.ico).*)"],
// };

// import { NextRequest, NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// const publicRoutes = ["/login", "/login/admin", "/reset-password"];

// const rolePermissions: Record<string, string[]> = {
//   DOCENTE: ["/dashboard", "/config"],
//   ADMIN: ["/dashboard", "/config", "/users", "/institutions"],
//   SUPER: ["/dashboard", "/config", "/users", "/institutions", "/admin"],
// };

// // Verifica el JWT y devuelve el payload
// async function verifyAccessToken(token: string) {
//   try {
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//     const { payload } = await jwtVerify(token, secret);
//     return payload;
//   } catch (err) {
//     return null;
//   }
// }

// async function refreshTokenServer(request: NextRequest) {
//   try {
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.eduadminsoft.shop";
//     const res = await fetch(`${apiUrl}/auth/refresh`, {
//       method: "GET",
//       headers: {
//         Cookie: request.headers.get("cookie") || "",
//       },
//       credentials: "include",
//     });

//     if (!res.ok) return { success: false };

//     const setCookieHeader = res.headers.get("set-cookie");
//     const data = await res.json();

//     return {
//       success: true,
//       accessToken: data.accessToken,
//       refreshToken: data.refreshToken,
//       setCookieHeader,
//     };
//   } catch {
//     return { success: false };
//   }
// }

// export async function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
//   const accessToken = request.cookies.get("accessToken")?.value;
//   const refreshToken = request.cookies.get("refreshToken")?.value;

//   // ✅ No aplicar lógica si está en una ruta pública
//   if (isPublicRoute) {
//     if (accessToken) {
//       return NextResponse.redirect(new URL("/dashboard", request.url));
//     }
//     return NextResponse.next(); // permite seguir a /login
//   }

//   // Si no hay accessToken pero sí refreshToken, intenta refrescar
//   if (!accessToken && refreshToken) {
//     const refreshResult = await refreshTokenServer(request);
//     if (refreshResult.success && refreshResult.setCookieHeader) {
//       const response = NextResponse.next();
//       response.headers.set("set-cookie", refreshResult.setCookieHeader);
//       return response;
//     } else {
//       const response = NextResponse.redirect(new URL("/login", request.url));
//       response.cookies.delete("accessToken");
//       response.cookies.delete("refreshToken");
//       return response;
//     }
//   }

//   // Si no hay ningún token, redirige a login
//   if (!accessToken) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // Verificar el token y extraer el rol
//   const payload = await verifyAccessToken(accessToken);
//   const role = payload?.role as string | undefined;

//   if (!role) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // Validar si el rol tiene acceso a la ruta actual
//   const allowedRoutes = rolePermissions[role];
//   const isAllowed = allowedRoutes?.some((route) => pathname.startsWith(route));

//   if (!isAllowed) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next|api|favicon.ico).*)"],
// };

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const publicRoutes = ["/login", "/login/admin", "/reset-password"];
const rolePermissions: Record<string, string[]> = {
  DOCENTE: ["/dashboard", "/config"],
  ADMIN: ["/dashboard", "/config", "/users"],
  SUPER: ["/dashboard", "/config", "/users", "/institutions", "/admin"],
};

// No manipula headers ni cookies si no es necesario.
async function verifyAccessToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Excluye rutas públicas
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    const accessToken = request.cookies.get("accessToken")?.value;
    if (accessToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Solo protege rutas privadas (ajusta según tus rutas reales)
  const privateRoutePrefixes = ["/dashboard", "/config", "/users", "/institutions", "/admin"];
  const isPrivateRoute = privateRoutePrefixes.some(prefix => pathname.startsWith(prefix));
  if (!isPrivateRoute) {
    return NextResponse.next(); // No tocar nada que no sea privado
  }

  const accessToken = request.cookies.get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Si hay token, verifica el rol
  const payload = await verifyAccessToken(accessToken);
  const role = payload?.role as string | undefined;
  if (!role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // Valida acceso por rol
  const allowedRoutes = rolePermissions[role];
  const isAllowed = allowedRoutes?.some(route => pathname.startsWith(route));
  if (!isAllowed) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/|favicon.ico).*)", // Solo intercepta rutas de páginas
  ],
};
