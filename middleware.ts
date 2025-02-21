import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    // Manejar preflight request (CORS)
    if (req.method === "OPTIONS") {
        return new Response(null, { status: 204 });
    }


    
    // return withAuth(
    //     {
    //         pages: {
    //             signIn: "/login", // Redirigir a login si no está autenticado
    //         },
    //         callbacks: {
    //             authorized: ({ token }) => !!token, // Solo permite acceso si hay token
    //         },
    //     },
    // )(req as NextRequestWithAuth, {} as any);
}

// Aplicar middleware a TODA la aplicación excepto archivos estáticos
export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // Protege todo menos archivos estáticos
};
