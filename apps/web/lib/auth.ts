import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaClient } from "db";
import NextAuth, { type NextAuthResult } from "next-auth";
import authConfig from "./auth.config";

const result = NextAuth({
	...authConfig,
	adapter: PrismaAdapter(prismaClient),
	session: {
		strategy: "jwt",
	},
});

const handlers: NextAuthResult["handlers"] = result.handlers;
const auth: NextAuthResult["auth"] = result.auth;
const signIn: NextAuthResult["signIn"] = result.signIn;
const signOut: NextAuthResult["signOut"] = result.signOut;

export { handlers, auth, signIn, signOut };
