import { Builder, Browser, By, until, WebDriver } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";
import fs from "fs";

function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.ceil(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class MeetingRecorder {
	private driver: WebDriver | null = null;
	private videoId: string;
	private meetingUrl: string;
	constructor(videoId: string, meetingUrl: string) {
		this.videoId = videoId;
		this.meetingUrl = meetingUrl;
	}

	private async getDriver() {
		if (this.driver) return this.driver;
		const options = new Options();

		// options.excludeSwitches("enable-automation");
		// options.addArguments("--headless=new");
		options.addArguments("--enable-automation");
		options.addArguments("--disable-blink-features=AutomationControlled");
		options.addArguments("--use-fake-ui-for-media-stream");
		options.addArguments("--window-size=1280,720");
		options.addArguments("--auto-select-desktop-capture-source=[RECORD]");
		options.addArguments("--enable-usermedia-screen-capturing");
		options.addArguments('--auto-select-tab-capture-source-by-title="Meet"');
		options.addArguments("--allow-running-insecure-content");
		// options.addArguments("--start-maximized");
		// options.addArguments("--disable-gpu");
		options.addArguments("--disable-notifications");
		options.addArguments("--mute-audio");
		// options.addArguments("--no-sandbox");
		options.setUserPreferences({
			"media.navigator.permission.disabled": true,
		});

		let driver = await new Builder()
			.forBrowser(Browser.CHROME)
			.setChromeOptions(options)
			.build();

		this.driver = driver;
	}
	public async start(): Promise<void> {
		try {
			await this.getDriver();
			await this.joinMeeting();
			await new Promise((x) => setTimeout(x, 10000));
			await this.startRecording();
			console.log("here ens the browser");
		} catch (error) {
			console.log("something went wrong", error);
			//TODO: Notify user something went wrong, couln't keep recording
		}
	}

	private async joinMeeting(): Promise<void> {
		const driver = this.driver;
		if (!driver) {
			process.exit(1);
		}
		let retries = 1;
		while (retries != 5) {
			try {
				const wait = (ms: number) =>
					new Promise((resolve) => setTimeout(resolve, ms));
				await driver.executeScript(
					"Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
				);
				await driver.get(this.meetingUrl);
				await driver
					.manage()
					.window()
					.setRect({ width: 1280, height: 720, x: 0, y: 0 });

				await driver.sleep(3000);
				const actions = driver.actions({ bridge: true });

				const gotItButton = await driver.wait(
					until.elementLocated(By.xpath("//span[text()='Got it']")),
					5000
				);
				await actions
					.move({
						origin: gotItButton,
						x: getRandomInt(-5, 5),
						y: getRandomInt(-5, 5),
					})
					.perform();

				await gotItButton.click();

				const InputText = await driver.wait(
					until.elementLocated(By.xpath("//input[@placeholder='Your name']")),
					10000
				);
				await actions.move({ origin: InputText }).perform();

				await InputText.click();
				await InputText.sendKeys("Recalify Bot");

				const joinButton = await driver.wait(
					until.elementLocated(By.xpath("//span[text()='Ask to join']")),
					10000
				);
				await driver.wait(until.elementIsVisible(joinButton), 10000);
				await joinButton.click();
				return;
			} catch (error) {
				if (retries === 4) {
					//TODO: webhook to inform that failed to assign bot
				}
				await driver.takeScreenshot().then((data) => {
					fs.writeFileSync("error.png", data, "base64");
				});
				retries++;
			}
		}
	}
	private async startRecording(): Promise<void> {
		if (!this.driver) {
			return;
		}
		const backendURL = process.env.BACKEND_URL;

		const videoId = this.videoId;

		this.driver.executeScript(
			function (backendURL: string, videoId: string) {
				async function uploadStream(blob: Blob, partNumber: number) {
					await fetch(`${backendURL}/api/v1/upload-streamFile/upload`, {
						method: "POST",
						headers: {
							"X-Upload-Id": videoId,
							"x-part-number": partNumber.toString(),
						},
						body: blob,
					});
				}

				function findNumberOfParticipants() {
					const contributorButtonXpath = "//div[text()='People']";
					const contributorButton = document.evaluate(
						contributorButtonXpath,
						document,
						null,
						XPathResult.FIRST_ORDERED_NODE_TYPE,
						null
					);
					const button = contributorButton.singleNodeValue
						?.previousSibling as HTMLButtonElement;

					button.click();
					const xpath = "//div[text()='Contributors']";
					const element = document.evaluate(
						xpath,
						document,
						null,
						XPathResult.FIRST_ORDERED_NODE_TYPE,
						null
					);
					if (element.singleNodeValue) {
						const nextElement = element.singleNodeValue as HTMLElement;
						const sibling = nextElement.nextElementSibling as HTMLElement;
						if (sibling) {
							return Number(sibling.innerText.trim());
						}
					}
					// const closeButtonXpath = "//div[text()='Close']";

					// const closeButton = document.evaluate(
					// 	closeButtonXpath,
					// 	document,
					// 	null,
					// 	XPathResult.FIRST_ORDERED_NODE_TYPE,
					// 	null
					// );

					// const clsBtn = closeButton.singleNodeValue
					// 	?.previousSibling as HTMLButtonElement;

					// clsBtn.click();
					return 0;
				}

				const successPromise = (fetchFC: () => Promise<boolean>) => {
					return new Promise(async (resolve, reject) => {
						let count = 3;
						while (count !== 0) {
							const res = await fetchFC();
							console.log(res, "this is result");
							if (res) return resolve("Successfull");
							count--;
						}
						return reject();
					});
				};
				async function startRecord() {
					try {
						const res = await fetch(
							`${backendURL}/api/v1/upload-streamFile/start`,
							{
								method: "POST",
								headers: {
									"X-Upload-Id": videoId,
								},
							}
						);
						if (res.ok) return true;
						return false;
					} catch (error) {
						return false;
					}
				}
				async function stopRecording() {
					try {
						const response = await fetch(
							`${backendURL}/api/v1/upload-streamFile/stop`,
							{
								method: "PATCH",
								headers: {
									"X-Upload-Id": videoId,
								},
							}
						);
						console.log("this s response", response);
						if (response.ok) return true;
						return false;
					} catch (error) {
						return false;
					}
				}

				function startRecording(stream: any) {
					return new Promise((resolve, reject) => {
						let recorder = new MediaRecorder(stream);
						let partNumber = 1;
						let uploading = false;
						let combinedBlob: Blob | null = null;
						recorder.ondataavailable = async (event) => {
							const participants = findNumberOfParticipants();
							if (participants === 1) {
								await uploadStream(
									new Blob([combinedBlob!, event.data], {
										type: event.data.type,
									}),
									partNumber
								);
								await successPromise(stopRecording);
								recorder.stop();
								resolve("Record successfully");
								return;
							}
							const currentBlob = event.data;
							combinedBlob = combinedBlob
								? new Blob([combinedBlob, currentBlob], {
										type: currentBlob.type,
									})
								: currentBlob;

							const sizeInMb = combinedBlob.size / (1024 * 1024);
							if (sizeInMb >= 5 && !uploading) {
								uploading = true;
								try {
									await uploadStream(combinedBlob, partNumber++);
								} catch (error) {
									console.error("Upload failed", error);
								} finally {
									uploading = false;
								}
							}
						};
						recorder.onerror = (event) => {
							reject();
						};
						recorder.onstop = () => {
							resolve("Recorded successfully.");
						};
						recorder.start(30000);
					});
				}

				window.navigator.mediaDevices
					.getDisplayMedia({
						video: {
							displaySurface: "browser",
						},
						audio: true,
						//@ts-ignore
						preferCurrentTab: true,
					})
					.then(async (screenStream) => {
						const audioContext = new AudioContext();
						const screenAudioStream =
							audioContext.createMediaStreamSource(screenStream);
						const audioEl1 = document.querySelectorAll("audio")[0];
						const audioEl2 = document.querySelectorAll("audio")[1];
						const audioEl3 = document.querySelectorAll("audio")[2];
						const audioElStream1 = audioContext.createMediaStreamSource(
							//@ts-ignore
							audioEl1.srcObject
						);
						const audioElStream2 = audioContext.createMediaStreamSource(
							//@ts-ignore
							audioEl3.srcObject
						);
						const audioElStream3 = audioContext.createMediaStreamSource(
							//@ts-ignore
							audioEl2.srcObject
						);

						const dest = audioContext.createMediaStreamDestination();

						screenAudioStream.connect(dest);
						audioElStream1.connect(dest);
						audioElStream2.connect(dest);
						audioElStream3.connect(dest);

						// Combine screen and audio streams

						const combinedStream = new MediaStream([
							...screenStream.getVideoTracks(),
							...dest.stream.getAudioTracks(),
						]);

						console.log("before start recording");
						await successPromise(startRecord).catch((e) => {
							throw new Error("Failed to start recording.");
						});

						await startRecording(combinedStream);

						// Clean up streams
						screenStream.getTracks().forEach((track) => track.stop());
						// audioStream.getTracks().forEach((track) => track.stop());
					});
			},
			backendURL,
			videoId
		);
	}
}

// (async () => {
// 	const videoId = process.argv[2];
// 	const meetingUrl = process.argv[3];
// 	console.log(videoId, "this is vidoe id");
// 	console.log("this is backend url", process.env.BACKEND_URL);
// 	if (!videoId || !meetingUrl) {
// 		process.exit(1);
// 	}
// 	const meetingInstance = new MeetingRecorder(videoId, meetingUrl);
// 	await meetingInstance.start();
// })();

async function recordingBot(videoId: string, meetingUrl: string) {
	// const videoId = process.argv[2];
	// const meetingUrl = process.argv[3];
	console.log("this is backend url", process.env.BACKEND_URL);
	if (!videoId || !meetingUrl) {
		process.exit(1);
	}
	const meetingInstance = new MeetingRecorder(videoId, meetingUrl);
	await meetingInstance.start();
}

export { recordingBot };
