import { Builder, Browser, By, until, WebDriver } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

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

		options.addArguments("--disable-blink-features=AutomationControlled");
		options.addArguments("--use-fake-ui-for-media-stream");
		options.addArguments("--window-size=1080,720");
		options.addArguments("--auto-select-desktop-capture-source=[RECORD]");
		options.addArguments("--auto-select-desktop-capture-source=[RECORD]");
		options.addArguments("--enable-usermedia-screen-capturing");
		options.addArguments('--auto-select-tab-capture-source-by-title="Meet"');
		options.addArguments("--allow-running-insecure-content");

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
			await new Promise((x) => setTimeout(x, 2000));
			await this.startRecording();
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
		try {
			await driver.get(this.meetingUrl);
			await driver.executeScript(
				"Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
			);

			const actions = driver.actions({ async: true });
			const wait = (ms: number) =>
				new Promise((resolve) => setTimeout(resolve, ms));

			await driver.executeScript("window.scrollBy(0, 100)");
			// await wait(2000);
			const gotItButton = await driver.wait(
				until.elementLocated(By.xpath("//span[text()='Got it']")),
				10000
			);
			await gotItButton.click();

			const InputText = await driver.wait(
				until.elementLocated(By.xpath("//input[@placeholder='Your name']")),
				10000
			);
			// await wait(2000);
			await driver.wait(until.elementIsVisible(InputText), 5000);
			await actions.move({ origin: InputText }).click().perform();
			// await wait(2000);
			await InputText.sendKeys("Bibek Tamang bot");

			const joinButton = await driver.wait(
				until.elementLocated(By.xpath("//span[text()='Ask to join']")),
				10000
			);
			// await wait(5000);
			await driver.wait(until.elementIsVisible(joinButton), 5000);
			// await wait(1000 + Math.random() * 1000);
			await actions.move({ origin: joinButton }).click().perform();
			// const partcipants = await driver.wait(
			// 	until.elementLocated(By.xpath("//span[text()='Contributors]")),
			// 	10000
			// );
		} catch (error) {
			console.log("failed to open browser and join", error);
		}
	}
	private async startRecording(): Promise<void> {
		if (!this.driver) {
			console.log("driver is not available");
			return;
		}
		const backendURL = process.env.BACKEND_URL;

		const videoId = this.videoId;

		this.driver.executeScript(
			function (backendURL: string, videoId: string) {
				async function uploadStream(arrayBuffer: Blob, partNumber: number) {
					await fetch(`${backendURL}/api/v1/upload-streamFile/upload`, {
						method: "POST",
						headers: {
							"X-Upload-Id": videoId,
							"x-part-number": partNumber.toString(),
						},
						body: arrayBuffer,
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
						recorder.ondataavailable = async (event) => {
							const participants = findNumberOfParticipants();
							if (participants === 1) {
								await successPromise(stopRecording);
								recorder.stop();
								return;
							}
							await uploadStream(event.data, partNumber);
						};
						recorder.onerror = (event) => {
							reject();
						};
						recorder.onstop = () => {
							resolve("Recorded successfully.");
						};
						recorder.start(2000);
					});
				}

				console.log("before mediadevices");

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
						console.log("after start recording");

						console.log("after download button click");

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

(async () => {
	const videoId = process.argv[2];
	const meetingUrl = process.argv[3];

	if (!videoId || !meetingUrl) {
		process.exit(1);
	}
	const meetingInstance = new MeetingRecorder(videoId, meetingUrl);
	await meetingInstance.start();
})();
