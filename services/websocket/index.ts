import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws, request) {
	ws.onerror = (e) => console.error(e);

	const token = request.headers["sec-websocket-accept"];

	ws.onmessage;
});
