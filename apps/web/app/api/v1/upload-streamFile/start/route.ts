import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { redisClient } from "redis-config";
import { StreamUploadFile } from "upload-files";

export async function POST(req: NextRequest) {
	const uploadId = req.headers.get("x-upload-id");
	if (!uploadId) {
		return NextResponse.json({ success: false }, { status: 400 });
	}
	const streamUpload = new StreamUploadFile();
	streamUpload.start(`${uploadId}.mp4`);

	try {
		await redisClient.set(uploadId, JSON.stringify(streamUpload));
		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ success: false, message: "Internal server error" },
			{ status: 500 }
		);
	}
}
