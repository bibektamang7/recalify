import { Worker } from "bullmq";
import { redisConnection } from "../lib/redis";
import { prismaClient } from "db";

const summaryWorker = new Worker(
	"summary",
	async (job) => {
		const { videoId } = job.data;
		try {
			
		} catch (error: any) {
			console.log("something went worng while summarizing video", error);
			throw new Error("Failed to summary");
		}
	},
	{
		connection: redisConnection,
		concurrency: 5,
	}
);
