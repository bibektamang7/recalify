"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	ArrowLeft,
	MessageSquare,
	Star,
	Clock,
	Calendar,
	ArrowUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const VideoDetailPage = ({ params }: { params: { id: string } }) => {
	const [isFavorite, setIsFavorite] = useState(false);

	// Mock video data
	const video = {
		id: params,
		title: "Weekly Team Standup",
		date: "Today, 9:30 AM",
		duration: "25 min",
		thumbnail: "/placeholder.svg?height=240&width=400",
	};

	// Mock transcript data
	const transcript = [
		{
			speaker: "John",
			time: "00:00",
			text: "Good morning everyone, let's get started with our weekly standup.",
		},
		{
			speaker: "Sarah",
			time: "00:15",
			text: "I've been working on the new feature we discussed last week.",
		},
		{
			speaker: "Michael",
			time: "00:45",
			text: "I've completed the design for the landing page.",
		},
		{
			speaker: "John",
			time: "01:10",
			text: "Great work! Any blockers anyone wants to discuss?",
		},
		{
			speaker: "Sarah",
			time: "01:30",
			text: "I'm waiting on the API documentation from the backend team.",
		},
		{
			speaker: "John",
			time: "01:45",
			text: "I'll follow up with them after this meeting.",
		},
	];

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-4">
				<Button
					variant="ghost"
					size="icon"
					asChild
				>
					<Link href="/dashboard">
						<ArrowLeft className="h-5 w-5" />
						<span className="sr-only">Back</span>
					</Link>
				</Button>
				<h1 className="text-2xl font-bold tracking-tight">{video.title}</h1>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setIsFavorite(!isFavorite)}
					className={isFavorite ? "text-yellow-500" : ""}
				>
					<Star className="h-5 w-5" />
					<span className="sr-only">Favorite</span>
				</Button>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<div className="md:col-span-2 space-y-6">
					<Card>
						<div className="relative aspect-video w-full overflow-hidden bg-muted">
							<Image
								src={video.thumbnail || "/placeholder.svg"}
								alt={video.title}
								fill
								className="object-cover"
							/>
						</div>
						<CardContent className="p-4">
							<div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
								<div className="flex items-center gap-1">
									<Calendar className="h-4 w-4" />
									<span>{video.date}</span>
								</div>
								<div className="flex items-center gap-1">
									<Clock className="h-4 w-4" />
									<span>{video.duration}</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<Tabs defaultValue="transcribe">
						<TabsList className="grid w-full grid-cols-4">
							<TabsTrigger value="transcribe">Transcribe</TabsTrigger>
							<TabsTrigger value="summary">Summary</TabsTrigger>
							<TabsTrigger value="chat">Chat</TabsTrigger>
							<TabsTrigger value="notes">Notes</TabsTrigger>
						</TabsList>
						<TabsContent
							value="transcribe"
							className="mt-4"
						>
							<Card>
								<CardContent className="p-4 space-y-4">
									{transcript.map((item, index) => (
										<div
											key={index}
											className="space-y-1"
										>
											<div className="flex items-center gap-2">
												<span className="font-medium">{item.speaker}</span>
												<span className="text-xs text-muted-foreground">
													{item.time}
												</span>
											</div>
											<p className="text-sm">{item.text}</p>
										</div>
									))}
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent
							value="summary"
							className="mt-4"
						>
							<Card>
								<CardContent className="p-4">
									<h3 className="font-medium mb-2">Meeting Summary</h3>
									<div className="space-y-2 text-sm">
										<p>
											The team discussed progress on current projects. Sarah is
											working on a new feature, and Michael completed the
											landing page design.
										</p>
										<p>
											Sarah mentioned she's blocked waiting for API
											documentation from the backend team. John will follow up
											with them after the meeting.
										</p>
										<h4 className="font-medium mt-4">Action Items:</h4>
										<ul className="list-disc pl-5 space-y-1">
											<li>
												John to follow up with backend team on API documentation
											</li>
											<li>Sarah to continue work on the new feature</li>
											<li>Michael to implement the landing page design</li>
										</ul>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent
							value="chat"
							className="mt-4"
						>
							<Card>
								<CardContent className="p-4">
									<div className="flex flex-col h-[300px] justify-end">
										<div className="space-y-4 overflow-y-auto">
											<div className="flex items-start gap-2">
												<div className="rounded-full bg-primary/10 p-2">
													<MessageSquare className="h-4 w-4" />
												</div>
												<div className="rounded-lg bg-muted p-3">
													<p className="text-sm">
														Hello! I'm your meeting assistant. Ask me anything
														about this meeting.
													</p>
												</div>
											</div>
										</div>
										<div className="mt-4 flex items-center gap-2">
											<Input
												placeholder="Ask a question about this meeting..."
												className="flex-1"
											/>
											<Button size="icon">
												<ArrowUp className="h-4 w-4" />
												<span className="sr-only">Send</span>
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent
							value="notes"
							className="mt-4"
						>
							<Card>
								<CardContent className="p-4">
									<Textarea
										placeholder="Add your notes here..."
										className="min-h-[300px]"
									/>
									<Button className="mt-4">Save Notes</Button>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default VideoDetailPage;
