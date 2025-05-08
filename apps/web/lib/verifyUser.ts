import { auth } from "./auth";
import { prismaClient } from "db";
import type { NextApiRequest, NextApiResponse } from "next";

export async function getAuthUser() {
	const session = await auth();
	console.log(session);
	if (!session?.user) return null;

	return session.user;
}
