import { NextRequest, NextResponse } from "next/server";
import { VideoTranscribedSchema } from "validation";
import { addVideoTranscribe } from "queue";

export async function POST(req: NextRequest) {
	const requestData = await req.json();
	console.log("ye chere");
	console.log(requestData);

	const parsedData = VideoTranscribedSchema.safeParse(requestData);
	if (!parsedData.success) {
		return NextResponse.json(
			{ success: false, message: "Validation failed" },
			{ status: 403 }
		);
	}
	try {
		await addVideoTranscribe({
			videoId: parsedData.data.videoId,
			videoUrl: parsedData.data.videoUrl,
		});
		console.log("yhea here i come, don worrk");
		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error: any) {
		return NextResponse.json(
			{ success: false, message: "Internal server error" },
			{ status: 500 }
		);
	}
}
