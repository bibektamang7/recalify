import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoCardProps {
	video: {
		id: string;
		title: string;
		date: string;
		duration: string;
		thumbnail: string;
	};
}

const VideoCard = ({ video }: VideoCardProps) => {
	return (
		<Card className="overflow-hidden transition-all hover:shadow-md">
			<Link href={`/dashboard/video/${video.id}`}>
				<div className="relative aspect-video w-full overflow-hidden bg-muted">
					<Image
						src={video.thumbnail || "/placeholder.svg"}
						alt={video.title}
						fill
						className="object-cover"
					/>
					<div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-background/80 px-2 py-1 text-xs backdrop-blur-sm">
						<Clock className="h-3 w-3" />
						<span>{video.duration}</span>
					</div>
				</div>
			</Link>
			<CardContent className="p-4">
				<Link href={`/dashboard/video/${video.id}`}>
					<h3 className="font-medium line-clamp-1 hover:text-primary transition-colors">
						{video.title}
					</h3>
				</Link>
				<p className="text-xs text-muted-foreground mt-1">{video.date}</p>
			</CardContent>
			<CardFooter className="p-4 pt-0 flex justify-between">
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8"
				>
					<Star className="h-4 w-4" />
					<span className="sr-only">Favorite</span>
				</Button>
			</CardFooter>
		</Card>
	);
};
export default VideoCard;
