import { auth } from "./lib/auth";
import { NextRequest, NextResponse } from "next/server";

async function middleware(req: NextRequest) {
	const session = await auth();
	const path = req.nextUrl.pathname;

	const isPublicPath =
		path === "/" ||
		path === "/login" ||
		path === "/signup" ||
		path.startsWith("/blog") ||
		path === "/terms" ||
		path === "/privacy";

	const isAuthenticated = session?.user;
	console.log(isAuthenticated, 'this ischek', path)

	if (!isAuthenticated && !isPublicPath) {
		const redirectUrl = new URL("/login", req.url);
		redirectUrl.searchParams.set("from", path);
		return NextResponse.redirect(redirectUrl);
	}

	if (isAuthenticated && (path === "/login" || path === "/signup")) {
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		// "/((?!_next/static|_next/image|favicon.ico|public).*)",
		"/login",
		"/signup",
		"/dashboard/:path*",
	],
};

export default middleware;
