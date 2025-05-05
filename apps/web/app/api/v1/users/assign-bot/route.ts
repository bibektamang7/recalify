import { getAuthUser } from "@/lib/verifyUser";
import { prismaClient } from "db";
import { NextRequest, NextResponse } from "next/server";
import { AssignBotSchema } from "validation";
import { spawn } from "child_process";

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
				userId: user.id,
			},
		});

		// TODO:
		const dockerArgs = [
			"run",
			"--rm",
			"--name",
			`bot-${video.id}`, //container name
			video.id,
			parsedData.data.meetingUrl,
		];
		const docker = spawn("docker", dockerArgs);

		docker.stdout.on("data", (data) => {
			console.log(`${video.id}`, data);
		});

		docker.stderr.on("data", (data) => {
			console.log(`${video.id} ERROR`, data);
		});

		docker.on("close", (code) => {
			console.log(`${video.id} exited with code `, code);
		});

		return NextResponse.json(
			{ success: true, message: "Bot Assigned" },
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
