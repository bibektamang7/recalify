import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export default {
	trustHost: true,
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
			
		}),
	],
} satisfies NextAuthConfig;
