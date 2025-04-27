import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";
import { createTrpcRouter, publicProcedure } from "./init";
import { S3 } from "@/lib/r2";

let writer: Bun.NetworkSink | null = null;

const uploadChunk = {
	initialize: publicProcedure
		.input(z.object({ videoId: z.string() }))
		.mutation(({ input }) => {
			const videoFile = S3.file(`${input.videoId}.webp`, {
				partSize: 40 * 29,
				retry: 3,
				type: "video/webp",
			});
			writer = videoFile.writer({
				retry: 3,
				queueSize: 4,
				partSize: 5 * 1024 * 1024,
				type: "video/webp",
			});
		}),
	upload: publicProcedure
		.input(
			z.object({
				file: z.any(), //for now
				fheel: z.any(),
			})
		)
		.mutation(({ input }) => {
			writer?.write(input.file);
		}),
	endUpload: publicProcedure.mutation(() => {
		writer?.end();
	}),
} satisfies TRPCRouterRecord;

export const trpcRouter = createTrpcRouter({
	fileChunkUpload: uploadChunk,
});

export type TRPCRouter = typeof trpcRouter;
