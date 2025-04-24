import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "db";

export async function POST(req: NextRequest) {
	const requestData = await req.json();

	try {
		const video = await prismaClient.video.update({
			where: {
				id: requestData.videoId,
			},
			data: {
				isFavourite: requestData.isFavourite,
			},
		});

		if (!video) {
			return NextResponse.json(
				{ success: false, message: "Video not found" },
				{ status: 400 }
			);
		}
		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error: any) {
		return NextResponse.json(
			{ success: false, message: "Internal server error" },
			{ status: 500 }
		);
	}
}
