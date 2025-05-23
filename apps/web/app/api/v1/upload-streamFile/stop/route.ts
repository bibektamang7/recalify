import { prismaClient } from "db";
import type { NextRequest } from "next/server";
// import { plainToInstance } from "class-transformer";
// import { redisClient } from "redis-config";
import { NextResponse } from "next/server";
// import { StreamUploadFile } from "upload-files";
import { recordStop } from "queue";

export async function PATCH(req: NextRequest) {
	const uploadId = req.headers.get("x-upload-id");
	if (!uploadId) {
		return NextResponse.json({ success: false }, { status: 400 });
	}
	await prismaClient.video.updateMany({
		where: {
			id: uploadId,
		},
		data: {
			recordingBotStatus: "RECORDED",
		},
	});
	await recordStop({ uploadId });
	return NextResponse.json(
		{
			success: true,
		},
		{ status: 200 }
	);
}
