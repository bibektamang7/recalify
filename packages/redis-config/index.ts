import Redis from "ioredis";
const redisURL = process.env.REDIS_URL;

export const redisClient = new Redis(redisURL!, {maxRetriesPerRequest: null});
