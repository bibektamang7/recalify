import { Worker } from "bullmq";
import { redisConnection } from "../lib/redis";
import { prismaClient } from "db";
import axios from "axios";

const summaryWorker = new Worker(
	"summary",
	async (job) => {
		const { videoId } = job.data;
		try {
			// TODO: no sure response structure
			const response = await axios.post("http://localhost:11434/api/generate", {
				model: "mistral",
				prompt: "Hey there, how are you",
			});
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
