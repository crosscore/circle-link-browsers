// circle-link-browsers/src/pages/websocket-server.js
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8081 });

wss.on("connection", function connection(ws) {
  console.log("WebSocket Connected");
  ws.on("message", function incoming(data) {
    let message; // JSON or string
    try {
      message = JSON.parse(data);
    } catch (e) {
      message = data;
    }
    if (typeof message === "string" && message.startsWith("Circle reached end:")) {
      const xPosition = parseFloat(message.split(": ")[1]);
      if (!isNaN(xPosition)) {
        console.log(
          "Circle 1 has reached the right end of the screen at position:",
          xPosition
        );
      }
    }
  });
  ws.on("close", () => {
    console.log("WebSocket Disconnected");
  });
});

wss.on("listening", () => {
  console.log(`WebSocket Server is running on port 8081 ... [${new Date().toISOString()}]`);
});
