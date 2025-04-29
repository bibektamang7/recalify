import Link from "next/link";
import { Button } from "@/components/ui/button";
import VideoCard from "@/components/video-card";
import { Star } from "lucide-react";

const FavoritesPage = () => {
	const favoriteVideos = [
		{
			id: "1",
			title: "Weekly Team Standup",
			date: "Today, 9:30 AM",
			duration: "25 min",
			thumbnail: "/placeholder.svg?height=120&width=200",
		},
		{
			id: "3",
			title: "Client Presentation",
			date: "May 15, 2023",
			duration: "60 min",
			thumbnail: "/placeholder.svg?height=120&width=200",
		},
		{
			id: "5",
			title: "Product Roadmap",
			date: "April 28, 2023",
			duration: "55 min",
			thumbnail: "/placeholder.svg?height=120&width=200",
		},
	];

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold tracking-tight">Favorites</h1>
			</div>

			{favoriteVideos.length > 0 ? (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{favoriteVideos.map((video) => (
						<VideoCard
							key={video.id}
							video={video}
						/>
					))}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center py-12 text-center">
					<div className="mb-4 rounded-full bg-muted p-3">
						<Star className="h-6 w-6 text-muted-foreground" />
					</div>
					<h2 className="text-xl font-semibold">No favorites yet</h2>
					<p className="mt-2 text-muted-foreground">
						Star your favorite meetings to find them here
					</p>
					<Button
						asChild
						className="mt-4"
					>
						<Link href="/dashboard">Go to Overview</Link>
					</Button>
				</div>
			)}
		</div>
	);
};

export default FavoritesPage;
