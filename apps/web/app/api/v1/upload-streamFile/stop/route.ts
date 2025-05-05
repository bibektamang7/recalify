import type { NextRequest } from "next/server";
import { plainToInstance } from "class-transformer";
import { redisClient } from "redis-config";
import { NextResponse } from "next/server";
import { StreamUploadFile } from "upload-files";

export async function PATCH(req: NextRequest) {
	const uploadId = req.headers.get("x-upload-id");
	if (!uploadId) {
		return NextResponse.json({ success: false }, { status: 400 });
	}
	const storedData = await redisClient.get(uploadId);
	const streamUploaderInstance = plainToInstance(StreamUploadFile, storedData);
	await streamUploaderInstance.stop()
}

