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
	callbacks: {
		async signIn({ account, profile }) {
			if (account?.provider === "google") {
				if (!profile?.email) return false;
				try {
					const createdUser = await prismaClient.user.findUnique({
						where: {
							email: profile.email,
						},
					});
					if (!createdUser) {
						await prismaClient.user.create({
							data: {
								email: profile.email,
								name: profile.name!,
								profile: profile.picture,
							},
						});
					}
				} catch (error: any) {
					console.log(error);
					return false;
				}
			}
			return true;
		},
		async jwt({ token, user, account, profile }) {
			if (account && profile) {
				token.picture = profile.picture;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.image = token.picture as string;
			}
			return session;
		},
	},
});

const handlers: NextAuthResult["handlers"] = result.handlers;
const auth: NextAuthResult["auth"] = result.auth;
const signIn: NextAuthResult["signIn"] = result.signIn;
const signOut: NextAuthResult["signOut"] = result.signOut;

export { handlers, auth, signIn, signOut };
