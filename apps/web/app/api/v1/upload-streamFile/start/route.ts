import { prismaClient } from "db";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { recordStart } from "queue";

export async function POST(req: NextRequest) {
	const uploadId = req.headers.get("x-upload-id");
	if (!uploadId) {
		return NextResponse.json({ success: false }, { status: 400 });
	}
	try {
		await prismaClient.video.update({
			where: {
				id: uploadId,
			},
			data: {
				url: `http://localhost:9000/recalify/${uploadId}.webm`,
				recordingBotStatus: "RECORDING",
			},
		});
		// await redisClient.set(uploadId, JSON.stringify(streamUpload));
		await recordStart({ key: `${uploadId}.webm`, uploadId });
		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		console.log("something went wrong ", error);
		return NextResponse.json(
			{ success: false, message: "Internal server error" },
			{ status: 500 }
		);
	}
}
