import { getAuthUser } from "@/lib/verifyUser";
import { prismaClient } from "db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const user = await getAuthUser();
	if (!user) {
		return NextResponse.json(
			{
				success: false,
				message: "Unauthorized access",
			},
			{ status: 401 }
		);
	}
	const videos = await prismaClient.video.findMany({
		where: {
			userId: user.id,
		},
	});

	return NextResponse.json(
		{
			success: true,
			data: {
				videos,
			},
		},
		{ status: 200 }
	);
}
