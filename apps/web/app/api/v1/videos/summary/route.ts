import { getAuthUser } from "@/lib/verifyUser";
import { prismaClient } from "db";
import { NextRequest, NextResponse } from "next/server";
import { addVideoSummary } from "queue";

export async function GET(req: NextRequest) {
	const user = await getAuthUser();
	if (!user) {
		return NextResponse.json(
			{ success: false, message: "Unauthorized access" },
			{ status: 401 }
		);
	}
	const requestData = await req.json();
	try {
		const summary = await prismaClient.summary.findFirst({
			where: {
				videoId: requestData.videoId,
				type: requestData.summaryType,
			},
		});

		//TODO: not sure about this logic
		if (!summary) {
			//TODO: create summary
			// call llm here directly, but still not sure about it
			await addVideoSummary({
				videoId: requestData.videoId,
				summaryType: requestData.summaryType,
			});
		}

		return NextResponse.json(
			{ success: true, data: { summary } },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ success: false, message: "Internal server error" },
			{ status: 500 }
		);
	}
}

export async function POST(req: NextRequest) {
	const user = await getAuthUser();
	if (!user) {
		return NextResponse.json(
			{ success: false, message: "Unauthorized access" },
			{ status: 401 }
		);
	}
	const requestData = await req.json();

	if (!requestData.videoId) {
		return NextResponse.json(
			{ success: false, message: "Video id is required" },
			{ status: 400 }
		);
	}
	try {
		const video = await prismaClient.video.findUnique({
			where: {
				id: requestData.videoId,
			},
		});

		if (!video) {
			return NextResponse.json(
				{ success: false, message: "Video not found" },
				{ status: 400 }
			);
		}

		await addVideoSummary({
			videoId: video.id,
			summaryType: requestData.summaryType || "short",
		});
		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error: any) {
		console.log("something went wrong", error);
		return NextResponse.json(
			{ success: false, message: "Internal server error" },
			{ status: 500 }
		);
	}
}
