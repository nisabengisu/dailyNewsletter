import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/libs/auth";

const AUTH_PAGES = ["/login", "/register"];

const isAuthPages = (url) => AUTH_PAGES.some((page) => url.startsWith(page));

export async function middleware( request ) {
    const { url, nextUrl, cookies } = request;
    const { value: token } = cookies.get("token") ?? { value: null };

    if (!token) {
        // Kullanıcı giriş yapmamışsa, login sayfasına yönlendir.
        return new Response.redirect(`/login?next=${nextUrl.pathname}`);
    }

    // Kullanıcı giriş yapmışsa, panel sayfasına erişime izin ver.
    return Response.next();
}

export const config = { matcher: ["/login", "/panel/:path*"] };