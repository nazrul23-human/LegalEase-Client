import { NextResponse } from "next/server";

export function middleware(req) {

    const token = req.cookies.get("token")?.value;
    const role = req.cookies.get("role")?.value;
    const url = req.nextUrl.pathname;

    const protectedRoutes = ["/dashboard", "/admin", "/lawyer"];

    if (protectedRoutes.some(route => url.startsWith(route))) {

        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    if (url.startsWith("/admin") && role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (url.startsWith("/lawyer") && role !== "lawyer") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*", "/lawyer/:path*"]
};