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
		options.addArguments("--no-sandbox");
		options.addArguments("--disable-dev-shm-usage");
		options.addArguments("--start-maximized");
		options.addArguments("--disable-notifications");

		options.addArguments("--window-size=1080,720");
		options.addArguments("--auto-select-desktop-capture-source=[RECORD]");
		options.addArguments("--enable-usermedia-screen-capturing");
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
			await this.startRecording();
		} catch (error) {}
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
			await wait(2000);
			const gotItButton = await driver.wait(
				until.elementLocated(By.xpath("//span[text()='Got it']")),
				10000
			);
			await gotItButton.click();

			const InputText = await driver.wait(
				until.elementLocated(By.xpath("//input[@placeholder='Your name']")),
				10000
			);
			await wait(2000);
			await driver.wait(until.elementIsVisible(InputText), 5000);
			await actions.move({ origin: InputText }).click().perform();
			await wait(2000);
			await InputText.sendKeys("Bibek Tamang bot");

			const joinButton = await driver.wait(
				until.elementLocated(By.xpath("//span[text()='Ask to join']")),
				10000
			);
			await wait(5000);
			await driver.wait(until.elementIsVisible(joinButton), 5000);
			await wait(1000 + Math.random() * 1000);
			await actions.move({ origin: joinButton }).click().perform();
			const partcipants = await driver.wait(
				until.elementLocated(By.xpath("//span[text()='Contributors]")),
				10000
			);
		} catch (error) {
			console.log("failed to open browser and join", error);
		}
	}
	private async startRecording(): Promise<void> {
		const response = await this.driver?.executeScript(`
			const backendURL = ${JSON.stringify(process.env.BACKEND_URL)}
			const videoId = ${JSON.stringify(this.videoId)}
        function wait(delayInMS) {
            return new Promise((resolve) => setTimeout(resolve, delayInMS));
        }

        function startRecording(stream) {
            let recorder = new MediaRecorder(stream);
            
            recorder.ondataavailable = async (event) => {
				const arrayBuffer = await event.data.arrayBuffer()
				await fetch(\`\${backendURL}/api/v1/upload-streamFile/upload\`, {
					method: "POST",
					headers: {
						"Content-Type": "application/octet-stream",
						"X-Upload-Id": \`\${videoId}\'
					},
					body: \`\${arrayBuffer}\`,

				})
				//TODO:check number of participants, if only one then end recording
            }
            recorder.start();
            

            // let stopped = new Promise((resolve, reject) => {
            //     recorder.onstop = resolve;
            //     recorder.onerror = (event) => reject(event.name);
            // });
            
            // let recorded = wait(lengthInMS).then(() => {
            //     if (recorder.state === "recording") {
            //     recorder.stop();
            //     }
            // });
            
            // return Promise.all([stopped, recorded]).then(() => data);
        }
      
        console.log("before mediadevices")
        window.navigator.mediaDevices.getDisplayMedia({
            video: {
              displaySurface: "browser"
            },
            audio: true,
            preferCurrentTab: true
        }).then(async screenStream => {                        
            const audioContext = new AudioContext();
            const screenAudioStream = audioContext.createMediaStreamSource(screenStream)
            const audioEl1 = document.querySelectorAll("audio")[0];
            const audioEl2 = document.querySelectorAll("audio")[1];
            const audioEl3 = document.querySelectorAll("audio")[2];
            const audioElStream1 = audioContext.createMediaStreamSource(audioEl1.srcObject)
            const audioElStream2 = audioContext.createMediaStreamSource(audioEl3.srcObject)
            const audioElStream3 = audioContext.createMediaStreamSource(audioEl2.srcObject)

            const dest = audioContext.createMediaStreamDestination();

            screenAudioStream.connect(dest)
            audioElStream1.connect(dest)
            audioElStream2.connect(dest)
            audioElStream3.connect(dest)

            // window.setInterval(() => {
            //   document.querySelectorAll("audio").forEach(audioEl => {
            //     if (!audioEl.getAttribute("added")) {
            //       console.log("adding new audio");
            //       const audioEl = document.querySelector("audio");
            //       const audioElStream = audioContext.createMediaStreamSource(audioEl.srcObject)
            //       audioEl.setAttribute("added", true);
            //       audioElStream.connect(dest)
            //     }
            //   })

            // }, 2500);
          
          // Combine screen and audio streams
          const combinedStream = new MediaStream([
              ...screenStream.getVideoTracks(),
              ...dest.stream.getAudioTracks()
          ]);
          
          console.log("before start recording")
		  await fetch(\`\${backendURL}/api/v1/uploadStreamFile/start\` , {
			method: "POST",
			headers: {
				"X-Upload-Id": \`\${videoId}\`
			}
		  })
          const recordedChunks = await startRecording(combinedStream);
          console.log("after start recording")
          
        //   let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
          
          // Create download for video with audio
        //   const recording = document.createElement("video");
        //   recording.src = URL.createObjectURL(recordedBlob);
          
        //   const downloadButton = document.createElement("a");
        //   downloadButton.href = recording.src;
        //   downloadButton.download = "RecordedScreenWithAudio.webm";    
        //   downloadButton.click();
          
          console.log("after download button click")
          
          // Clean up streams
          screenStream.getTracks().forEach(track => track.stop());
          audioStream.getTracks().forEach(track => track.stop());
        })
        
    `);

		// await this.driver?.sleep(100000);
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
