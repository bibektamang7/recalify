import axios from "axios";
async function getTranscribe() {
	try {
		const response = await axios.post("http://localhost:11434/api/embeddings", {
			model: "nomic-embed-text",
			prompt: "an embedding is a fixed-length vector that represent text.",
		});
		console.log(response.data);
	} catch (error: any) {
		console.log("sothing wmen wrong", error);
	}
}

getTranscribe();
