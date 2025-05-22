export interface Video {
	id: string;
	title: string;
	url: string;
	userId: string;
	isTranscribed: boolean;
	transcripts: Transcript[];
	summaries: Summary[];
	createdAt: string;
	Question: Question[];
	isFavourite: string;
	recordingBotStatus: string;
}

export interface Transcript {
	id: string;
	videoId: string;
	text: string;
	startTime: number;
	endTime: number;
	segments: JSON;
	embedding: number[];
}

enum SummaryEnum {
	Short,
	Detailed,
	Bullet_Points,
}

export interface Summary {
	id: string;
	videoId: string;
	summary: string;
	type: SummaryEnum;
	createdAt: string;
}

export interface Question {
	id: string;
	userId: string;
	videoId: string;
	question: string;
	answer: string;
	askedAt: Date;
}
