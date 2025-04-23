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
	video: string
}

const addVideoSummary = (data: VideoSummaryProps) => {
	summaryQueue.add("videoSummary", data);
};
