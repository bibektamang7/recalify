"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	ArrowLeft,
	MessageSquare,
	Star,
	Calendar,
	ArrowUp,
	MoreVertical,
	Share2,
	Trash2,
	Download,
	Edit,
	Copy,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { Segment, Video } from "@/types/video";
import React from "react";
import { secondToTime } from "@/lib/utils";
import VideoPlayer from "@/components/VideoPlayer";

interface VideoDetailsProps {
	video: Video;
}

const VideoDetails = ({ video }: VideoDetailsProps) => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [isFavorite, setIsFavorite] = useState(false);
	const handleTranscribe = async () => {
		try {
			const response = await axios.post(
				"http://localhost:3000/api/v1/videos/transcribe",
				{
					videoId: video.id,
					videoUrl: `http:host.docker.internal:9000/recalify/${video.id}.webm`,
				}
			);
			console.log(response, "this is response in video id page");
		} catch (error) {
			console.log("somethign went wrong while hiting transcribe video");
		}
	};

	const handleVideoTimeline = useCallback(
		(time: number) => {
			if (videoRef.current) {
				videoRef.current.currentTime = time;
			}
		},
		[videoRef]
	);

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-4">
				<Button onClick={handleTranscribe}>Transcribe</Button>
				<Button
					variant="ghost"
					size="icon"
					asChild
					className="text-white hover:bg-zinc-800"
				>
					<Link href="/dashboard">
						<ArrowLeft className="h-5 w-5" />
						<span className="sr-only">Back</span>
					</Link>
				</Button>
				<h1 className="text-2xl font-bold tracking-tight text-white">
					{video.title}
				</h1>
				<div className="flex items-center ml-auto">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setIsFavorite(!isFavorite)}
						className={`text-white hover:bg-zinc-800 ${isFavorite ? "text-yellow-500" : ""}`}
					>
						<Star className="h-5 w-5" />
						<span className="sr-only">Favorite</span>
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="text-white hover:bg-zinc-800"
							>
								<MoreVertical className="h-5 w-5" />
								<span className="sr-only">More options</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="bg-zinc-900 border-zinc-800 text-white"
						>
							<DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer">
								<Share2 className="mr-2 h-4 w-4" />
								<span>Share</span>
							</DropdownMenuItem>
							<DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer">
								<Download className="mr-2 h-4 w-4" />
								<span>Download</span>
							</DropdownMenuItem>
							<DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer">
								<Edit className="mr-2 h-4 w-4" />
								<span>Rename</span>
							</DropdownMenuItem>
							<DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer">
								<Copy className="mr-2 h-4 w-4" />
								<span>Copy link</span>
							</DropdownMenuItem>
							<DropdownMenuSeparator className="bg-zinc-800" />
							<DropdownMenuItem className="text-red-500 hover:bg-zinc-800 hover:text-red-500 cursor-pointer">
								<Trash2 className="mr-2 h-4 w-4" />
								<span>Delete</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<div className="md:col-span-2 space-y-6">
					<Card className="bg-zinc-900 border-zinc-800">
						<VideoPlayer
							url={video.url!}
							videoRef={videoRef}
						/>
						<CardContent className="p-4">
							<div className="flex flex-wrap gap-4 text-sm text-zinc-400">
								<div className="flex items-center gap-1">
									<Calendar className="h-4 w-4" />
									<span>{video.createdAt.toLocaleString()}</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<Tabs defaultValue="transcribe">
						<TabsList className="grid w-full grid-cols-4 bg-zinc-800 text-zinc-400">
							<TabsTrigger
								value="transcribe"
								className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white"
							>
								Transcribe
							</TabsTrigger>
							<TabsTrigger
								value="summary"
								className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white"
							>
								Summary
							</TabsTrigger>
							<TabsTrigger
								value="chat"
								className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white"
							>
								Chat
							</TabsTrigger>
							<TabsTrigger
								value="notes"
								className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white"
							>
								Notes
							</TabsTrigger>
						</TabsList>
						<TabsContent
							value="transcribe"
							className="mt-4"
						>
							<Card className="bg-zinc-900 border-zinc-800">
								<CardContent className="p-4 space-y-4">
									{video.transcripts.map((item, index) => (
										<p
											key={item.id}
											className="leading-[0.2rem] inline"
										>
											{item.segments?.map((segment: Segment, index: number) => (
												<p
													key={segment.id}
													className="px-2 inline-flex items-center gap-2"
												>
													{item.segments[index + 1]?.start - segment.end >
														2 && <br />}
													{segment.text}
													<span
														onClick={() =>
															handleVideoTimeline(
																Number(segment.start.toFixed())
															)
														}
														className="text-xs text-blue-400 hover:cursor-pointer"
													>
														{secondToTime(Number(segment.start.toFixed()))}
													</span>
												</p>
											))}
										</p>
									))}
									j
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent
							value="summary"
							className="mt-4"
						>
							<Card className="bg-zinc-900 border-zinc-800">
								<CardContent className="p-4">
									<h3 className="font-medium mb-2 text-white">
										Meeting Summary
									</h3>
									<div className="space-y-2 text-sm text-zinc-300">
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
										<h4 className="font-medium mt-4 text-white">
											Action Items:
										</h4>
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
							<Card className="bg-zinc-900 border-zinc-800">
								<CardContent className="p-4">
									<div className="flex flex-col h-[300px] justify-end">
										<div className="space-y-4 overflow-y-auto">
											<div className="flex items-start gap-2">
												<div className="rounded-full bg-purple-500/10 p-2">
													<MessageSquare className="h-4 w-4 text-purple-500" />
												</div>
												<div className="rounded-lg bg-zinc-800 p-3">
													<p className="text-sm text-zinc-300">
														Hello! I'm your meeting assistant. Ask me anything
														about this meeting.
													</p>
												</div>
											</div>
										</div>
										<div className="mt-4 flex items-center gap-2">
											<Input
												placeholder="Ask a question about this meeting..."
												className="flex-1 bg-zinc-800 border-zinc-700 text-white"
											/>
											<Button
												size="icon"
												className="bg-purple-500 hover:bg-purple-600 text-white"
											>
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
							<Card className="bg-zinc-900 border-zinc-800">
								<CardContent className="p-4">
									<Textarea
										placeholder="Add your notes here..."
										className="min-h-[300px] bg-zinc-800 border-zinc-700 text-white"
									/>
									<Button className="mt-4 bg-purple-500 hover:bg-purple-600 text-white">
										Save Notes
									</Button>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default VideoDetails;
