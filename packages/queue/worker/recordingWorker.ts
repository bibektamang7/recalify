import { Worker } from "bullmq";
import { redisConnection } from "../lib/redis";
import { recordingBot } from "bot-spawn";

export const recordingWorker = new Worker(
	"meetingBot",
	async (job) => {
		const { videoId, meetingUrl } = job.data;
		try {
			await recordingBot(videoId, meetingUrl);
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
