// import ffmpeg from 'fluent-ffmpeg';
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { uploadVideoToS3 } from "queue";

// ffmpeg('input.webm')
//   .videoBitrate('500k')
//   .save('output.mp4');

export async function POST(req: NextRequest) {
	const uploadId = req.headers.get("x-upload-id");
	const uploadPart = req.headers.get("x-part-number");
	const uploadData = await req.json();
	if (!uploadId || !uploadPart) {
		return NextResponse.json({ success: false }, { status: 400 });
	}

	if (!uploadData) {
		return NextResponse.json({ success: false }, { status: 400 });
	}

	await uploadVideoToS3({
		uploadData,
		uploadPart: Number(uploadPart),
		uploadId: uploadId,
	});

	return NextResponse.json({ success: true }, { status: 200 });
}
