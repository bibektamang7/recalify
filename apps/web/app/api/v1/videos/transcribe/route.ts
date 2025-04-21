import { prismaClient } from "db";
import { NextRequest, NextResponse } from "next/server";
import { VideoTranscribedSchema } from "validation";

// TODO: might use trpc here
export async function POST(req: NextRequest) {
	const requestData = await req.json();

	const parsedData = VideoTranscribedSchema.safeParse(requestData);
	if (!parsedData.success) {
		return NextResponse.json(
			{ success: false, message: "Validation failed" },
			{ status: 403 }
		);
	}

	try {
		// const transcribes = await prismaClient.transcript.createManyAndReturn({
		// 	data:
		// })

		const [transcribes] = await prismaClient.$transaction([
			prismaClient.transcript.createManyAndReturn({
				data: parsedData.data.transcribes.map((transcribe) => ({
					...transcribe,
					videoId: parsedData.data.vidoeId,
				})),
			}),
		]);
		if (!transcribes || transcribes.length < 1) {
			return NextResponse.json({ success: false }, { status: 400 });
		}
		//TODO: include this in transaction too
		await prismaClient.video.update({
			where: {
				id: parsedData.data.vidoeId,
			},
			data: {
				transcripts: {
					createMany: {
						data: transcribes,
					},
				},
			},
		});

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error: any) {
		return NextResponse.json(
			{ success: false, message: "Internal server error" },
			{ status: 500 }
		);
	}
}
