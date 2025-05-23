import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const secondToTime = (seconds: number) => {
	let hours = Math.floor(seconds / (60 * 60));
	seconds -= hours * (60 * 60);
	let minutes = Math.floor(seconds / 60);
	seconds -= minutes * 60;

	return hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
};

export const timeToSecond = (time: string) => {
	const eachTime = time.split(":");
	const seconds =
		Number(eachTime[0]) * 3600 + Number(eachTime[1]) * 60 + Number(eachTime[2]);
	return seconds;
};

