import { Worker } from "bullmq";
import { redisConnection } from "../lib/redis";
import axios from "axios";
import { prismaClient } from "db";

interface SegmentProps {
	id: number;
	seek: number;
	start: number;
	end: number;
	text: string;
}

export const transcribeWorker = new Worker(
	"transcribe",
	async (job) => {
		const jobData = job.data;
		const url = "http://localhost:8000/transcribe/";
		try {
			const response = await axios.post(`${url}`, { url: jobData.url });
			await prismaClient.$transaction(
				response.data.segments.map(async (segment: SegmentProps) => {
					const embeddingResponse = await axios.post(
						"http://localhost:11434/api/embeddings",
						{
							model: "nomic-embed-text",
							prompt: segment.text,
						}
					);
					return await prismaClient.transcript.create({
						data: {
							text: segment.text,
							startTime: segment.start,
							endTime: segment.end,
							videoId: jobData.videoId,
							embedding: embeddingResponse.data.embedding,
						},
					});
				})
			);
		} catch (error: any) {
			console.log(error);
			throw new Error("Failed to transcribe");
		}
	},
	{ connection: redisConnection, concurrency: 5 }
);
