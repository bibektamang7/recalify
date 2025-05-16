import { redisConnection } from "./redis";
import { Queue } from "bullmq";

const recordQueue = new Queue("record", {
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

interface RecordMeetingProps {
	videoId: string;
	meetingUrl: string;
}

recordQueue
	.waitUntilReady()
	.then(() => {
		console.log("bullmq queue connected to redis");
	})
	.catch((error) => console.error("failed to connect queue to redis", error));

export const recordMeeting = async (data: RecordMeetingProps) => {
	console.log("yes yeat aayo");
	await recordQueue.add("recordMeeting", data);
};
