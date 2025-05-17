import { Worker } from "bullmq";
import { redisConnection } from "../lib/redis";
import { StreamUploadFile } from "upload-files";
// import { plainToInstance } from "class-transformer";

let uploadStreamInstances = new Map<string, StreamUploadFile>();

export const uploadVideoWorker = new Worker(
	"uploadVideo",
	async (job) => {
		const jobData = job.data;
		if (job.name === "uploadStart") {
			const uploadStreamInstance = new StreamUploadFile();
			await uploadStreamInstance.start(jobData.key);
			uploadStreamInstances.set(jobData.uploadId, uploadStreamInstance);
		} else if (job.name === "uploadStop") {
			try {
				const uploadInstance = uploadStreamInstances.get(jobData.uploadId);
				console.log(uploadInstance, "this is upload instance");
				if (!uploadInstance) {
					throw new Error("Failed to get upload streamer");
				}
				await uploadInstance.stop();
			} catch (error) {
				console.log("this is error ins stop", error);
				throw new Error("Something went wrong while upload stop");
			}
			return;
		}
		try {
			const uploadInstance = uploadStreamInstances.get(jobData.uploadId);

			if (!uploadInstance) {
				throw new Error("Something went wrong while uploading video part");
			}
			//TODO: QUEUE this
			console.log(jobData, "this is jobData");
			const res = await uploadInstance.upload(
				jobData.uploadData.data,
				Number(jobData.uploadPart)
			);
			console.log("this is the res after upload", res);
		} catch (error: any) {
			throw new Error("Failed to upload video part");
		}
	},
	{ connection: redisConnection, concurrency: 1 }
);

uploadVideoWorker.on("ready", () => {
	console.log("upload video worker is ready");
});
uploadVideoWorker.on("error", () => {
	console.log("something went wrong in upload video worker");
});
uploadVideoWorker.on("failed", (err) => {
	console.log(
		"upload video worker is failed",
		err?.failedReason,
		err?.clearLogs()
	);
});
uploadVideoWorker.on("completed", () => {
	console.log("upload video worker is completed");
});

uploadVideoWorker.on("drained", () => {
	console.log("upload video worker is drained");
});
