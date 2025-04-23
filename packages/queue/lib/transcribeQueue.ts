import { Queue } from "bullmq";
import { redisConnection } from "./redis";

export const transcribeQueue = new Queue("transcribe", {
	connection: redisConnection,
	defaultJobOptions: {
		attempts: 5,
		backoff: {
			type: "fixed",
			delay: 2000,
		},
		removeOnComplete: true,
		removeOnFail: false
	}
});

interface AddTranscribeProps {
	videoId: string
}

export const addVideoTranscribe = async (data: AddTranscribeProps) => {
	await transcribeQueue.add("videoTranscribe", data);
};
