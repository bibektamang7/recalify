import { Video } from "./video";

export interface User {
	id: string;
	name: string;
	email: string;
	profile: string;
	videos?: Video[];
	createdAt: Date;
}
