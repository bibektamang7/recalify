import { z } from "zod";

export const AssignBotSchema = z.object({
	meetingUrl: z.string(),
	videoName: z.string(),
});

export const VideoRecordedSchema = z.object({
	videoUrl: z.string(),
	videoId: z.string(),
});

export const VideoTranscribedSchema = z.object({
	videoUrl: z.string(),
	vidoeId: z.string(),
});

export const AskQuestionSchema = z.object({
	videoId: z.string(),
	question: z.string(),
});
