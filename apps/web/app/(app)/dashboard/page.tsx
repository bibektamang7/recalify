import VideoCard from "@/components/video-card";
import { prismaClient } from "db";
import { getAuthUser } from "@/lib/verifyUser";

const DashboardPage = async () => {
	const user = await getAuthUser();
	const videos = await prismaClient.video.findMany({
		where: {
			userId: user?.id,
		},
		select: {
			id: true,
			title: true,
			url: true,
			isTranscribed: true,
			createdAt: true,
			isFavourite: true,
			recordingBotStatus: true,
		},
	});
	console.log(videos, "this is videos");

	return (
		<div className="space-y-6">
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
