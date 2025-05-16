import { Worker } from "bullmq";
import { redisConnection } from "../lib/redis";
import axios from "axios";
import { prismaClient } from "db";
import { StreamUploadFile } from "upload-files";
import { plainToInstance } from "class-transformer";

interface SegmentProps {
	id: number;
	seek: number;
	start: number;
	end: number;
	text: string;
}

export const uploadVideoWorker = new Worker(
	"uploadVideo",
	async (job) => {
		const jobData = job.data;
		console.log(jobData);
		try {
			const storedData = await redisConnection.get(jobData.uploadId);

			if (!storedData) {
				throw new Error("Something went wrong while uploading video part");
			}
			const deserializedUploader = plainToInstance(
				StreamUploadFile,
				JSON.parse(storedData)
			);
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
