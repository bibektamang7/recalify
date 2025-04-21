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
	//TODO: Implement pagination logic
	try {
		const questions = await prismaClient.question.findMany({
			where: {
				videoId: requestData.videoId,
			},
		});
		if (!questions || questions.length > 1) {
			return NextResponse.json(
				{ success: false, message: "No Questions" },
				{ status: 400 }
			);
		}
		return NextResponse.json(
			{
				success: true,
				data: {
					questions,
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
