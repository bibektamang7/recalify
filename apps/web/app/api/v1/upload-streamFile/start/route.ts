import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { recordStart } from "queue";
import { record } from "zod";

export async function POST(req: NextRequest) {
	const uploadId = req.headers.get("x-upload-id");
	if (!uploadId) {
		return NextResponse.json({ success: false }, { status: 400 });
	}
	try {
		console.log("this is upload is in the start of upload stream", uploadId);
		// await redisClient.set(uploadId, JSON.stringify(streamUpload));
		await recordStart({ key: `${uploadId}.webm`, uploadId });
		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ success: false, message: "Internal server error" },
			{ status: 500 }
		);
	}
}
