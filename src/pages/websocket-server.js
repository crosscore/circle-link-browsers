// circle-link-browsers/src/pages/websocket-server.js
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8081 });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(data) {
    // Convert the received data to a string and parse it as JSON
    const message = JSON.parse(data.toString());

    // Log the message with the client identifier
    if (message.client) {
      console.log(`message from ${message.client}:`, message);
    } else {
      console.log("message from unknown client:", message);
    }
  });
});

wss.on("listening", () => {
  console.log(`WebSocket Server is running on port 8081 ... [${new Date().toISOString()}]`);
});
