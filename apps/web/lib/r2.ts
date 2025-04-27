import {S3Client} from "bun";

const R2_ACCOUNT_ID = process.env.NEXT_PUBLIC_R2_ACCOUNT_ID!;
const R2_ACCESS_KEY_ID = process.env.NEXT_PUBLIC_R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_R2_SECRET_ACCESS_KEY!;
const R2_BUCKET = process.env.NEXT_PUBLIC_R2_BUCKET!;

export const S3 = new S3Client({
	region: "auto",
	endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	accessKeyId: R2_ACCESS_KEY_ID,
	secretAccessKey: R2_SECRET_ACCESS_KEY,
	bucket: R2_BUCKET,
});

const videoFile = S3.file("videoId.mp4", {
	partSize: 40 * 29,
	retry: 3,
	type: "video/mp4",
});

const writer = videoFile.writer({
	retry: 3,
	queueSize: 4,
	partSize: 5 * 1024 * 1024,
	type: "video/mp4",
});

// ondatarecording => await writer.write(bigFile);

