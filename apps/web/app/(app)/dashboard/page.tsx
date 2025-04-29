import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VideoCard from "@/components/video-card";
import { Plus, Clock, Calendar, Star, Database } from "lucide-react";

const DashboardPage = () => {
	const videos = [
		{
			id: "1",
			title: "Weekly Team Standup",
			date: "Today, 9:30 AM",
			duration: "25 min",
			thumbnail: "/placeholder.svg?height=120&width=200",
		},
		{
			id: "2",
			title: "Product Planning",
			date: "Yesterday, 2:00 PM",
			duration: "45 min",
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
			id: "4",
			title: "Marketing Strategy",
			date: "May 10, 2023",
			duration: "40 min",
			thumbnail: "/placeholder.svg?height=120&width=200",
		},
	];

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold tracking-tight">Overview</h1>
				<Button
					asChild
					className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
				>
					<Link href="/dashboard/new-meeting">
						<Plus className="mr-2 h-4 w-4" />
						New Meeting
					</Link>
				</Button>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">
							Total Meetings
						</CardTitle>
						<Calendar className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">24</div>
						<p className="text-xs text-muted-foreground">+5 from last month</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">Meeting Hours</CardTitle>
						<Clock className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">18.5</div>
						<p className="text-xs text-muted-foreground">
							+2.5 from last month
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">Favorites</CardTitle>
						<Star className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">7</div>
						<p className="text-xs text-muted-foreground">+2 from last month</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">Storage Used</CardTitle>
						<Database className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">1.2 GB</div>
						<p className="text-xs text-muted-foreground">of 5 GB (24%)</p>
					</CardContent>
				</Card>
			</div>

			<div>
				<h2 className="text-xl font-bold mb-4">Recent Meetings</h2>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{videos.map((video) => (
						<VideoCard
							key={video.id}
							video={video}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
export default DashboardPage;
