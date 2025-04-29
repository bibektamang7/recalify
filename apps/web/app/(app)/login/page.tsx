import AuthButton from "@/components/AuthButton";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

const Login = () => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-background/95 to-background/90 p-4">
			<Link
				href="/"
				className="absolute left-8 top-8 flex items-center justify-center gap-2"
			>
				<div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
					<div className="absolute inset-0 flex items-center justify-center text-white font-bold">
						R
					</div>
				</div>
				<span className="font-bold text-xl">Recaify</span>
			</Link>

			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold">Log in</CardTitle>
					<CardDescription>
						Continue with Google to access your account
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col items-center">
					<AuthButton type="Continue" />
				</CardContent>
				<CardFooter className="flex flex-col space-y-4">
					<Separator />
					<div className="text-center text-sm">
						Don&apos;t have an account?{" "}
						<Link
							href="/signup"
							className="hover:underline text-purple-400 hover:text-purple-300"
						>
							Sign up
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Login;
