import { Worker } from "bullmq";
import { redisConnection } from "../lib/redis";
import { StreamUploadFile } from "upload-files";
import { plainToInstance } from "class-transformer";

export const uploadVideoWorker = new Worker(
	"uploadVideo",
	async (job) => {
		const jobData = job.data;
		console.log(jobData);
		if (job.name === "uploadStop") {
			try {
				console.log("stop upload worker");
				const storedData = await redisConnection.get(job.data.uploadId);
				if (!storedData) {
					throw new Error("Failed to get upload streamer");
				}
				const streamUploaderInstance = plainToInstance(
					StreamUploadFile,
					JSON.parse(storedData)
				);
				await streamUploaderInstance.stop();
			} catch (error) {
				throw new Error("Something went wrong while upload stop");
			}
			return;
		}
		try {
			console.log("upload worker");
			const storedData = await redisConnection.get(jobData.uploadId);

			if (!storedData) {
				throw new Error("Something went wrong while uploading video part");
			}
			const deserializedUploader = plainToInstance(
				StreamUploadFile,
				JSON.parse(storedData)
			);
			console.log("this is upload data", jobData.uploadData);
			//TODO: QUEUE this
			await deserializedUploader.upload(
				jobData.uploadData,
				Number(jobData.uploadPart)
			);
		} catch (error: any) {
			throw new Error("Failed to upload video part");
		}
	},
	{ connection: redisConnection, concurrency: 5 }
);

uploadVideoWorker.on("ready", () => {
	console.log("upload video worker is ready");
});
uploadVideoWorker.on("error", () => {
	console.log("something went wrong in upload video worker");
});
uploadVideoWorker.on("failed", () => {
	console.log("upload video worker is failed");
});
uploadVideoWorker.on("completed", () => {
	console.log("upload video worker is completed");
});

uploadVideoWorker.on("drained", () => {
	console.log("upload video worker is drained");
});
