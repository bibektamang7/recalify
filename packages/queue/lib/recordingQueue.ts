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

export const recordMeeting = async (data: RecordMeetingProps) => {
	await recordQueue.add("recordMeeting", data);
};
