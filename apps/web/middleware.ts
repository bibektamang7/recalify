import { NextRequest } from "next/server";
import { auth } from "./lib/auth";

auth(async function middleware(_req: NextRequest) {});

export default auth;
