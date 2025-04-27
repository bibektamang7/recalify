import { createTRPCClient, httpLink } from "@trpc/client";
import { TRPCRouter } from "@/trpc/router";

const trpc = createTRPCClient<TRPCRouter>({
	links: [
		httpLink({
			url: "/api/v1/trcp",
		}),
	],
});

export { trpc };
