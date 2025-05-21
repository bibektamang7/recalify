import { Worker } from "bullmq";
import { redisConnection } from "../lib/redis";
import axios from "axios";
import { prismaClient } from "db";

type Segment = { id: number; start: number; end: number; text: string };
type Chunk = { start: number; end: number; text: string; segments: Segment[] };

function groupSegmentsToChunks(
	segments: Segment[],
	maxChunkDuration = 30
): Chunk[] {
	const chunks: Chunk[] = [];
	let currentChunk: Chunk = { start: 0, end: 0, text: "", segments: [] };

	for (const segment of segments) {
		const segmentDuration = segment.end - segment.start;

		if (
			currentChunk.segments.length === 0 ||
			segment.end - currentChunk.start <= maxChunkDuration
		) {
			// Add segment to current chunk
			currentChunk.segments.push(segment);
			currentChunk.end = segment.end;
			currentChunk.text += (currentChunk.text ? " " : "") + segment.text.trim();
		} else {
			// Save current chunk and start a new one
			chunks.push(currentChunk);
			currentChunk = {
				start: segment.start,
				end: segment.end,
				text: segment.text.trim(),
				segments: [segment],
			};
		}
	}
	// push last chunk
	if (currentChunk.segments.length > 0) {
		chunks.push(currentChunk);
	}

	return chunks;
}

export const transcribeWorker = new Worker(
	"transcribe",
	async (job) => {
		const jobData = job.data;
		const url = "http://localhost:8000/transcribe/";
		console.log("yeas pani aako xa hai no wowrry");
		try {
			const response = await axios.post(`${url}`, { url: jobData.videoUrl });
			groupSegmentsToChunks(response.data.segments);
			console.log(response, "this is respinse in worker video transcrib");
			// await prismaClient.$transaction(
			// 	response.data.segments.map(async (segment: SegmentProps) => {
			// 		// const embeddingResponse = await axios.post(
			// 		// 	"http://localhost:11434/api/embeddings",
			// 		// 	{
			// 		// 		model: "nomic-embed-text",
			// 		// 		prompt: segment.text,
			// 		// 	}
			// 		// );
			// 		// console.log(embeddingResponse, "this is in transcribe worker");
			// 		// return await prismaClient.transcript.create({
			// 		// 	data: {
			// 		// 		text: segment.text,
			// 		// 		startTime: segment.start,
			// 		// 		endTime: segment.end,
			// 		// 		videoId: jobData.videoId,
			// 		// 		embedding: embeddingResponse.data.embedding,
			// 		// 	},
			// 		// });
			// 	})
			// );
		} catch (error: any) {
			console.log(error);
			throw new Error("Failed to transcribe");
		}
	},
	{ connection: redisConnection, concurrency: 1 }
);

transcribeWorker.on("ready", () => {
	console.log("Transcribe worker is ready");
});
transcribeWorker.on("error", () => {
	console.log("something went wrong in Transcribe worker");
});
transcribeWorker.on("failed", () => {
	console.log("Transcribe worker is failed");
});
transcribeWorker.on("completed", () => {
	console.log("Transcribe worker is completed");
});

transcribeWorker.on("drained", () => {
	console.log("Transcribe worker is drained");
});
