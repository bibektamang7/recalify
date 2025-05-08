import { getAuthUser } from "@/lib/verifyUser";
import { prismaClient } from "db";
import { NextRequest, NextResponse } from "next/server";
import { AssignBotSchema } from "validation";
import { assignBotToMeeting } from "@/services/bot-spawner";

export async function POST(req: NextRequest) {
	const user = await getAuthUser();

	if (!user || !user.id) {
		return NextResponse.json(
			{ success: false, message: "Unauthorized access" },
			{ status: 401 }
		);
	}
	const data = await req.json();
	const parsedData = AssignBotSchema.safeParse(data);
	if (!parsedData.success) {
		return NextResponse.json(
			{ success: false, message: "Validation Error" },
			{ status: 401 }
		);
	}
	try {
		const video = await prismaClient.video.create({
			data: {
				title: parsedData.data.videoName,
				userId: user.id,
			},
		});
		assignBotToMeeting(video.id, parsedData.data.meetingUrl);

		return NextResponse.json(
			{ success: true, message: "Joining the meeting..." },
			{ status: 200 }
		);
	} catch (error) {
		console.log("unable to assign bot", error);
		return NextResponse.json(
			{ success: false, message: "Failed to assign bot" },
			{ status: 500 }
		);
	}
}
