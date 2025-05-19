// import { spawn } from "child_process";
import { recordMeeting } from "queue";

export const assignBotToMeeting = async (videoId: string, meetingUrl: string) => {
	console.log("yeac chhai aayo hai")
	await recordMeeting({ videoId, meetingUrl });
	//TODO: This is production ready setup
	// const containerName = `bot-${videoId}`;
	// const backendURL = process.env.AUTH_URL! || "http://localhost:3000";
	// const dockerArgs = [
	// 	"run",
	// 	"-d",
	// 	"--rm",
	// 	"-e",
	// 	backendURL,
	// 	"--name",
	// 	containerName,
	// 	"recording-bot",
	// 	videoId,
	// 	meetingURL,
	// ];
	// const dockerProcess = spawn("docker", dockerArgs);
	// dockerProcess.stdout.on("data", (data) => {
	// 	console.log("container name", data);
	// });
	// dockerProcess.stderr.on("data", async (data) => {
	// 	console.error("container name error", data.toString());
	// 	await updateWithRetry(videoId);
	// });
	// dockerProcess.on("close", (code) => {
	// 	console.log("Container exited with code ", code);
	// });
};

// function updateWithRetry(videoId: string) {
// 	return new Promise(async (resolve, reject) => {
// 		let retry = 0;
// 		while (retry !== 3) {
// 			try {
// 				setTimeout(async () => {
// 					await prismaClient.video.update({
// 						where: {
// 							id: videoId,
// 						},
// 						data: {
// 							recordingBotStatus: "FAILED",
// 						},
// 					});
// 					return resolve("Updated successfully.");
// 				}, 15000);
// 			} catch (error) {
// 				if (retry == 2) return reject("Failed to updated status.");
// 				retry++;
// 			}
// 		}
// 	});
// }
