import { getAuthUser } from "@/lib/verifyUser";
import { prismaClient } from "db";
import { NextRequest, NextResponse } from "next/server";

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

		if (!summary) {
			//TODO: create summary
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
