import { TRPCError } from "@trpc/server";

import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";
import { createTrpcRouter, publicProcedure } from "./init";
import { join } from "path";

const guitars = [
	{
		name: "hello",
		id: 123,
	},
	{
		name: "world",
		id: 1234,
	},
];

const guitarRouter = {
	list: publicProcedure.query(async () => guitars),
} satisfies TRPCRouterRecord;

export const trpcRouter = createTrpcRouter({
	guitars: guitarRouter,
});

export type TRPCRouter = typeof trpcRouter;
