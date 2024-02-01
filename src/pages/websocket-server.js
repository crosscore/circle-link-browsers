// circle-link-browsers/src/pages/websocket-server.js
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8081 });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(data) {
    const message = data.toString();
    console.log("message from client:", message);
  });
});

wss.on("listening", () => {
  console.log(`WebSocket Server is running on port 8081 ... [${new Date().toISOString()}]`);
});