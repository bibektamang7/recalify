import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Recalify AI - Meeting Assistant",
	description: "Record, transcribe, and summarize your meetings with AI",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
		>
			<body className={`${inter.className} min-h-screen bg-background dark`}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
