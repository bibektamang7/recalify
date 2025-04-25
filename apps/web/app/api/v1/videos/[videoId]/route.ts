import { getAuthUser } from "@/lib/verifyUser";
import { prismaClient } from "db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { videoId: string } }
) {
	const user = await getAuthUser();
	if (!user) {
		return NextResponse.json(
			{ success: false, message: "Unauthorized access" },
			{ status: 401 }
		);
	}
	const videoId = params.videoId;
	try {
		const video = await prismaClient.video.findFirst({
			where: {
				id: videoId,
			},
			include: {
				transcripts: true,
				summaries: true,
				Question: true,
			}
		});

		if (!video) {
			return NextResponse.json(
				{ success: false, message: "Video not found" },
				{ status: 400 }
			);
		}

		return NextResponse.json(
			{
				success: true,
				data: {
					video,
				},
			},
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ success: false, message: "Internal server error" },
			{ status: 500 }
		);
	}
}
