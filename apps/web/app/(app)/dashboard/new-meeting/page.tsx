"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Video, LinkIcon } from "lucide-react";

const NewMeetingPage = () => {
	const [meetingUrl, setMeetingUrl] = useState("");
	const [meetingName, setMeetingName] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission
		console.log({ meetingUrl, meetingName });
		// Redirect to dashboard or meeting page
	};

	return (
		<div className="mx-auto max-w-2xl h-full flex flex-col justify-center">
			<h1 className="text-3xl font-bold tracking-tight mb-6">New Meeting</h1>
			<Card>
				<CardHeader>
					<CardTitle>Add a Google Meet URL</CardTitle>
					<CardDescription>
						Enter a Google Meet URL and a name for your meeting
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="meetingUrl">Google Meet URL</Label>
							<div className="flex items-center space-x-2">
								<LinkIcon className="h-4 w-4 text-muted-foreground" />
								<Input
									id="meetingUrl"
									placeholder="https://meet.google.com/abc-defg-hij"
									value={meetingUrl}
									onChange={(e) => setMeetingUrl(e.target.value)}
									required
								/>
							</div>
						</div>
						<div className="space-y-2">
							<Label htmlFor="meetingName">Meeting Name</Label>
							<div className="flex items-center space-x-2">
								<Video className="h-4 w-4 text-muted-foreground" />
								<Input
									id="meetingName"
									placeholder="Weekly Team Standup"
									value={meetingName}
									onChange={(e) => setMeetingName(e.target.value)}
									required
								/>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button
							type="submit"
							className="hover:cursor-pointer w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 mt-6"
						>
							Create Meeting
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
};

export default NewMeetingPage;
