import { Queue } from "bullmq";
import { redisConnection } from "./redis";

const summaryQueue = new Queue("summary", {
	connection: redisConnection,
	defaultJobOptions: {
		attempts: 5,
		backoff: {
			type: "fixed",
			delay: 2000,
		},
		removeOnComplete: true,
		removeOnFail: false,
	},
});

interface VideoSummaryProps {
	videoId: string;
	summaryType: string
}

export const addVideoSummary = async (data: VideoSummaryProps) => {
	await summaryQueue.add("videoSummary", data);
};
