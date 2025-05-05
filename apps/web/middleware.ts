import { auth } from "./lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

async function middleware(req: NextRequest) {
	const session = await auth();
	const path = req.nextUrl.pathname;
	if (path.startsWith("/api/v1")) {
		const res = NextResponse.next();
		res.headers.append("Access-Control-Allow-Credentials", "true");
		res.headers.append("Access-Control-Allow-Origin", "*");
		res.headers.append(
			"Access-Control-Allow-Methods",
			"GET,DELETE,PATCH,POST,PUT,OPTIONS"
		);
		res.headers.append(
			"Access-Control-Allow-Headers",
			"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
		);
		return res;
	}
	const isPublicPath =
		path === "/" ||
		path === "/login" ||
		path === "/signup" ||
		path.startsWith("/blog") ||
		path === "/terms" ||
		path === "/privacy";

	const isAuthenticated = session?.user;
	console.log(isAuthenticated, "this ischek", path);

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
		"/api/:path*",
	],
};

export default middleware;
