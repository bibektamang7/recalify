import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import MyLoader from "./Loader";
import { cn } from "@/lib/utils";

type BotStatus = "RECORDING" | "RECORDED" | "FAILED" | "JOINING";

interface VideoCardProps {
	video: {
		id: string;
		title: string;
		createdAt: Date;
		url: string | null;
		recordingBotStatus: BotStatus;
	};
}

const botStatusTheme: Record<BotStatus, string> = {
	RECORDING: "text-blue-500",
	RECORDED: "text-green-500",
	FAILED: "text-red-500",
	JOINING: "text-yellow-500",
};

const VideoCard = ({ video }: VideoCardProps) => {
	return (
		<Card className="overflow-hidden transition-all hover:shadow-md">
			{video.recordingBotStatus === "RECORDED" ? (
				<div className="relative">
					<Link href={`/dashboard/video/${video.id}`}>
						<div className="relative aspect-video w-full overflow-hidden bg-muted mt-2">
							<video className="w-full  h-full object-cover">
								<source
									className="w-fit h-fit"
									src={video.url!}
									type="video/webm"
								/>
								<p>Your browser doesn't support HTML video</p>
							</video>
						</div>
					</Link>
					<Button
						variant="ghost"
						size="icon"
						className="h-8 w-8 absolute right-2 -top-5"
					>
						<Star className="h-4 w-4" />
						<span className="sr-only">Favorite</span>
					</Button>
				</div>
			) : (
				<MyLoader />
			)}
			<CardContent className="px-4 flex items-center justify-between">
				<div>
					<Link href={`/dashboard/video/${video.id}`}>
						<h3 className="font-medium line-clamp-1 hover:text-primary transition-colors">
							{video.title}
						</h3>
					</Link>
					<p className="text-xs text-muted-foreground mt-1">
						{video.createdAt.toLocaleString()}
					</p>
				</div>
				<p
					className={cn(
						"text-xs/tight",
						botStatusTheme[`${video.recordingBotStatus}`]
					)}
				>
					{video.recordingBotStatus}
				</p>
				{/* <Button
					variant="ghost"
					size="icon"
					className="h-8 w-8"
				>
					<Star className="h-4 w-4" />
					<span className="sr-only">Favorite</span>
				</Button> */}
			</CardContent>
		</Card>
	);
};
export default VideoCard;
