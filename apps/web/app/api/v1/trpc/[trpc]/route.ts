import { trpcRouter } from "@/trpc/router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) => {
	return fetchRequestHandler({
		req: req,
		router: trpcRouter,
		endpoint: "/api/v1/trpc",
	});
};

export { handler as GET, handler as POST };
