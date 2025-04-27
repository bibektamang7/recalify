import { auth } from "@/lib/auth";
import { getAuthUser } from "@/lib/verifyUser";
import { prismaClient } from "db";
import { NextRequest, NextResponse } from "next/server";
import { AssignBotSchema } from "validation";

export async function POST(req: NextRequest) {
	const user = await getAuthUser();
	if (!user) {
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
				userId: "",
			},
		});

		// TODO:
		// use bullMQ here for asynchronous bot assigning

		return NextResponse.json(
			{ success: true, message: "Bot Assigned" },
			{ status: 200 }
		);
	} catch (error) {}
}
