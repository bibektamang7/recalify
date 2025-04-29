import React from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import AuthButton from "@/components/AuthButton";

const Signup = () => {
	
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
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
			<Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-white">
						Sign up
					</CardTitle>
					<CardDescription className="text-zinc-400">
						Create an account with Google to get started with Recalify AI 
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col items-center">
					<AuthButton type="Sign up"/>					
					<div className="mt-4 text-center text-sm text-zinc-400">
						By signing up, you agree to our{" "}
						<Link
							href="/terms"
							className="text-purple-400 hover:text-purple-300 hover:underline"
						>
							Terms of Service
						</Link>{" "}
						and{" "}
						<Link
							href="/privacy"
							className="text-purple-400 hover:text-purple-300 hover:underline"
						>
							Privacy Policy
						</Link>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col space-y-4">
					<Separator className="bg-zinc-800" />
					<div className="text-center text-sm text-zinc-400">
						Already have an account?{" "}
						<Link
							href="/login"
							className="text-purple-400 hover:text-purple-300 hover:underline"
						>
							Log in
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Signup;
