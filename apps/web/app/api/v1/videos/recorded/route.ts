import { prismaClient } from "db";
import { NextRequest, NextResponse } from "next/server";
import { VideoRecordedSchema } from "validation";

export async function POST(req: NextRequest) {
	const requestData = await req.json();
	const parsedData = VideoRecordedSchema.safeParse(requestData);
	if (!parsedData.success) {
		return NextResponse.json(
			{ success: false, message: "Validation failed" },
			{ status: 500 }
		);
	}

	try {
		await prismaClient.video.update({
			where: {
				id: parsedData.data.videoId,
			},
			data: {
				url: parsedData.data.videoUrl,
			},
		});
		return NextResponse.json(
			{ success: true, message: "Recorded" },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ success: false, message: "Internal server error" },
			{ status: 500 }
		);
	}
}
