import { Worker } from "bullmq";
import { redisConnection } from "../lib/redis";
import { recordingBot } from "bot-spawn";

const recordingWorker = new Worker(
	"record",
	async (job) => {
		const { videoId, meetingUrl } = job.data;
		try {
			console.log("recording worker ma aayou");
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

recordingWorker.on("ready", () => {
	console.log("Recording worker is ready");
});
recordingWorker.on("error", () => {
	console.log("something went wrong in recording worker");
});
recordingWorker.on("failed", () => {
	console.log("Recording worker is failed");
});
recordingWorker.on("completed", () => {
	console.log("Recording worker is completed");
});

recordingWorker.on("drained", () => {
	console.log("Recording worker is drained");
});
