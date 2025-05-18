// import { S3 } from "./config";
import { s3 } from "./config";
import {
	CompleteMultipartUploadCommand,
	CreateMultipartUploadCommand,
	ListBucketsCommand,
	UploadPartCommand,
} from "@aws-sdk/client-s3";

const R2_BUCKET = process.env.R2_BUCKET!;

export class StreamUploadFile {
	public uploadId: string | undefined = undefined;
	private eTag: string | undefined = undefined;
	public key: string | null = null;
	private storedParts: Array<{ ETag: string; PartNumber: number }> = [];
	async check() {
		const result = await s3.send(new ListBucketsCommand());
		console.log("Buckets:", result.Buckets);
	}
	public async start(fileName: string) {
		const command = new CreateMultipartUploadCommand({
			Bucket: R2_BUCKET,
			Key: fileName,
			ContentType: "video/webm",
		});
		const { UploadId } = await s3.send(command);
		this.uploadId = UploadId;
		this.key = fileName;
	}
	public async upload(data: Buffer<ArrayBuffer>, partNumber: number) {
		if (!this.uploadId || !this.key) {
			return;
		}
		try {
			const uploadRes = await this.uploadPartWithRetry(
				{
					Bucket: R2_BUCKET,
					Key: this.key,
					PartNumber: partNumber,
					Body: Buffer.from(data),
					UploadId: this.uploadId,
				},
				3
			);
			if (!uploadRes) {
				console.log("what went wrong");
				return;
			}

			const { ETag } = uploadRes;
			this.eTag = ETag;
			this.storedParts.push({ ETag: ETag!, PartNumber: partNumber });
		} catch (error: any) {
			console.log("something went wrong", error);
		}
	}
	public async stop() {
		if (!this.eTag || !this.key) {
			return;
		}
		console.log("this is upload id in upload stop", this.uploadId);
		const command = new CompleteMultipartUploadCommand({
			Bucket: R2_BUCKET,
			Key: this.key,
			UploadId: this.uploadId,
			MultipartUpload: {
				Parts: this.storedParts,
			},
		});
		await s3.send(command);
	}
	async uploadPartWithRetry(
		params: {
			Bucket: string;
			Key: string;
			UploadId: string;
			PartNumber: number;
			Body: any;
		},
		maxRetries: number = 3
	) {
		let attempt = 0;
		const command = new UploadPartCommand(params);
		while (attempt < maxRetries) {
			try {
				const result = await s3.send(command);
				return result;
			} catch (error) {
				attempt++;
				console.warn(`upload part ${params.PartNumber} failed`, error);
				if (attempt >= maxRetries) {
					console.log("this is error ", error);
					throw new Error(`Failed to upload part ${params.PartNumber}`);
				}

				await new Promise((res) => setTimeout(res, 2 ** attempt * 100));
			}
		}
	}
}
