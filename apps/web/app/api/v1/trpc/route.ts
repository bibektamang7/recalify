import { publicProcedure, router } from "./trpc";

const appRouter = router({
	uploadChunk: publicProcedure.query(async () => {

	})
});

export type AppRouter = typeof appRouter;