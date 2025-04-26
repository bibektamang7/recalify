import { S3Client } from "bun";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/verifyUser";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	const user = await getAuthUser();
	if (!user) {
		return NextResponse.json(
			{ success: false, message: "Unauthorized access" },
			{ status: 401 }
		);
	}
	const requestData = await req.json();
	const presigned_url = S3Client.presign(`${requestData.videoId}.mp4`, {
		expiresIn: 3600,
		method: "PUT",
		type: "application/json",
		secretAccessKey: process.env.S3_SECRET_KEY,
		accessKeyId: process.env.S3_ACCESS_KEY,
		bucket: process.env.BUCKET_NAME,
	});
	return NextResponse.json(
		{ success: true, data: { url: presigned_url } },
		{ status: 200 }
	);
}
