import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { uploadVideoToS3 } from "queue";


export async function POST(req: NextRequest) {
	const uploadId = req.headers.get("x-upload-id");
	const uploadPart = req.headers.get("x-part-number");
	const uploadData = req.body;
	if (!uploadId || !uploadPart) {
		return NextResponse.json({ success: false }, { status: 400 });
	}

	if (!uploadData) {
		return NextResponse.json({ success: false }, { status: 400 });
	}

	console.log(uploadData, uploadPart, uploadId, "this is upload data");
	await uploadVideoToS3({
		uploadData,
		uploadPart: Number(uploadPart),
		uploadId: uploadId,
	});

	return NextResponse.json({ success: true }, { status: 200 });
}
