import { redisConnection } from "./redis";
import { Queue } from "bullmq";

export const uploadQueue = new Queue("uploadVideo", {
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

interface UploadVidoeToS3 {
	uploadData: ReadableStream<Uint8Array<ArrayBufferLike>>;
	uploadId: string;
	uploadPart: number;
}

export const uploadVideoToS3 = async (data: UploadVidoeToS3) => {
	await uploadQueue.add("videoUpload", data);
};
