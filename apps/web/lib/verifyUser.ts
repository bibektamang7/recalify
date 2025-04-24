import { auth } from "./auth";
import { prismaClient } from "db";

export async function getAuthUser() {
	const session = await auth();

	if (!session?.user?.email) return null;

	const user = await prismaClient.user.findUnique({
		where: { email: session.user.email },
	});

	return user;
}
