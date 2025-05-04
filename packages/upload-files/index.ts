import { S3 } from "./config";

export class StreamUploadFile {
	public videoUploadS3File: Bun.S3File | null = null;
	public writer: Bun.NetworkSink | null = null;
	constructor() {}
	public start(fileName: string) {
		const videoUploader = S3.file(fileName, {
			partSize: 40 * 29,
			retry: 3,
			type: "video/webm",
		});
		this.videoUploadS3File = videoUploader;
		const videoWriter = videoUploader.writer({
			retry: 3,
			queueSize: 4,
			partSize: 5 * 1024 * 1024,
			type: "video/webm",
		});
		this.writer = videoWriter;
	}
	public upload(data: ArrayBuffer) {
		if (!this.writer) {
			return;
		}
		try {
			const bytesWritten = this.writer.write(data);
		} catch (error: any) {
			console.log("something went wrong", error);
		}
	}
	public stop() {
		if (!this.writer) {
			console.log("Writer is null");
			return;
		}
		this.writer.end();
	}
}
