import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { uploadVideoToS3 } from "queue";

export async function POST(req: NextRequest) {
	const uploadId = req.headers.get("x-upload-id");
	const uploadPart = req.headers.get("x-part-number");
	const arrayBuffer = await req.arrayBuffer();
	const uploadData = Buffer.from(arrayBuffer);
	if (!uploadId || !uploadPart) {
		return NextResponse.json({ success: false }, { status: 400 });
	}

	if (!uploadData) {
		return NextResponse.json({ success: false }, { status: 400 });
	}

	await uploadVideoToS3({
		uploadData,
		uploadPart: Number(uploadPart),
		uploadId: uploadId,
	});

	return NextResponse.json({ success: true }, { status: 200 });
}
