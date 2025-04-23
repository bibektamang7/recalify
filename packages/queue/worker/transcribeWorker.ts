import { ErrorCode, Worker } from "bullmq";
import { redisConnection } from "../lib/redis";
import axios from "axios";

export const transcribeWorker = new Worker("transcribe", async (job) => {}, {
	connection: redisConnection,
	concurrency: 5,
});
