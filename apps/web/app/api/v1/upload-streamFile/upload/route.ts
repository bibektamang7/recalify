// import ffmpeg from 'fluent-ffmpeg';

import { NextRequest, NextResponse } from "next/server";
import { plainToInstance } from "class-transformer";
import { redisClient } from "redis-config";
import { StreamUploadFile } from "upload-files";

// ffmpeg('input.webm')
//   .videoBitrate('500k')
//   .save('output.mp4');

export async function POST(req: NextRequest) {
	const uploadId = req.headers.get("X-Upload-Id");
	const uploadPart = req.headers.get("x-upload-part");
	const uploadData = await req.json();
	if (!uploadId) {
		return NextResponse.json({ success: false }, { status: 400 });
	}

	const storedData = await redisClient.get(uploadId);
	if (!storedData) {
		return NextResponse.json({ success: false }, { status: 400 });
	}
	const deserializedUploader = plainToInstance(
		StreamUploadFile,
		JSON.parse(storedData)
	);
	//TODO: QUEUE this
	await deserializedUploader.upload(uploadData, Number(uploadPart));

	return NextResponse.json({ success: true }, { status: 200 });
}
