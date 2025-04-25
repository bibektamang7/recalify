import { getAuthUser } from "@/lib/verifyUser";
import { prismaClient } from "db";
import { NextRequest, NextResponse } from "next/server";
import { AskQuestionSchema } from "validation";
import axios from "axios"

export async function POST(req: NextRequest) {
	const user = await getAuthUser();
	if (!user) {
		return NextResponse.json(
			{ success: false, message: "Unauthorized access" },
			{ status: 401 }
		);
	}
	const requestData = await req.json();
	const parsedData = AskQuestionSchema.safeParse(requestData);
	if (!parsedData.success) {
		return NextResponse.json(
			{ success: false, message: "Validation Error" },
			{ status: 401 }
		);
	}

	try {
		const video = await prismaClient.video.findFirst({
			where: {
				id: parsedData.data.videoId,
			},
		});

		if (!video) {
			return NextResponse.json(
				{ success: false, message: "Video not found" },
				{ status: 400 }
			);
		}

		// TODO: streaming answer
		const response = await axios.post("http://localhost:11434/api/chat", {
			model: "mistral",
			prompt: "Hey there, how are you",
		});

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error: any) {
		return NextResponse.json(
			{ success: false, message: "Internal server error" },
			{ status: 500 }
		);
	}
}
