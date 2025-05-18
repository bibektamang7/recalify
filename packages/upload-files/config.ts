import { S3Client } from "@aws-sdk/client-s3";
// const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;
// const R2_BUCKET = process.env.R2_BUCKET!;
console.log(R2_ACCESS_KEY_ID, "thisis access key id")

console.log(R2_SECRET_ACCESS_KEY, "thisis secret accessj key")
export const s3 = new S3Client({
	region: "us-east-1",
	// endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	endpoint: "http://localhost:9000",
	forcePathStyle: true,
	credentials: {
		accessKeyId: R2_ACCESS_KEY_ID,
		secretAccessKey: R2_SECRET_ACCESS_KEY,
	},
	// bucketEndpoint: true,
});
