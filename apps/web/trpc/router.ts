import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";
import { createTrpcRouter, publicProcedure } from "./init";
import { S3 } from "@/lib/r2";
import { prismaClient } from "db";
import { addVideoSummary, addVideoTranscribe } from "queue";

let writer: Bun.NetworkSink | null = null;

const R2_BUCKET = process.env.NEXT_PUBLIC_R2_BUCKET!;

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
			})
		)
		.mutation(({ input }) => {
			writer?.write(input.file);
		}),
	endUpload: publicProcedure
		.input(
			z.object({
				videoId: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			await writer?.end();
			try {
				const video = await prismaClient.video.findUniqueAndUpdate({
					where: {
						id: input.videoId,
					},
					data: {
						url: `${R2_BUCKET}/${input.videoId}/mp4`,
					},
				});

				if (!video) {
					return false;
				}
				await addVideoTranscribe({
					videoId: video.id,
					videoUrl: `${R2_BUCKET}/${video.id}/mp4`,
				});
				await addVideoSummary({ summaryType: "short", videoId: video.id });
				return true;
			} catch (error: any) {
				console.log("something went wrong", error);
				return false;
			}
		}),
} satisfies TRPCRouterRecord;

export const trpcRouter = createTrpcRouter({
	fileChunkUpload: uploadChunk,
});

export type TRPCRouter = typeof trpcRouter;
