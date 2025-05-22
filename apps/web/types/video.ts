import { User } from "./user";

type RecordingBotStatus = "JOINING" | "FAILED" | "RECORDING" | "RECORDED";

export interface Video {
	id: string;
	title: string;
	url: string | null;
	userId?: string;
	user?: User;
	isTranscribed: boolean;
	transcripts: Transcript[];
	summaries: Summary[];
	createdAt: Date;
	Question: Question[];
	isFavourite: boolean;
	recordingBotStatus: RecordingBotStatus;
}

export type Segment = { id: number; start: number; end: number; text: string };
export type Chunk = { start: number; end: number; text: string; segments: Segment[] };
export interface Transcript {
	id: string;
	videoId: string;
	text: string;
	startTime: number;
	endTime: number;
	segments: any;
	embedding: number[];
}

type SummaryType = "Short" | "Detailed" | "Bullet_Points";

export interface Summary {
	id: string;
	videoId: string;
	summary: string;
	type: SummaryType;
	createdAt: Date;
}

export interface Question {
	id: string;
	userId: string;
	videoId: string;
	question: string;
	answer: string | null;
	askedAt: Date;
}
