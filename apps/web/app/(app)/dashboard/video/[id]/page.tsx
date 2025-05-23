import VideoDetails from "@/pages/VideoDetails";
import { prismaClient } from "db";

const VideoDetailPage = async ({ params }: { params: { id: string } }) => {
	const video = await prismaClient.video.findUniqueOrThrow({
		where: {
			id: params.id,
		},
		select: {
			id: true,
			title: true,
			url: true,
			userId: true,
			user: true,
			isTranscribed: true,
			transcripts: true,
			summaries: true,
			createdAt: true,
			Question: true,
			isFavourite: true,
			recordingBotStatus: true,
		},
	});
	console.log("this is vidoe", video)
	return <VideoDetails video={video} />;
};

export default VideoDetailPage;
