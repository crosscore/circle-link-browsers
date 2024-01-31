const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8081 });
let lastMessageTime = 0; // 最後にメッセージを出力した時刻を記録

wss.on("connection", function connection(ws) {
  console.log("WebSocket Connected");

  ws.on("message", function incoming(message) {
    console.log("received: %s", message);

    // X座標が含まれている場合、特定のアクションを実行
    if (message.startsWith("Circle reached end:")) {
      const xPosition = parseFloat(message.split(": ")[1]);
      if (xPosition > window.innerWidth) {
        console.log("Circle 1 has reached the right end of the screen.");
      }
    }
  });

  ws.on("close", () => {
    console.log("WebSocket Disconnected");
  });
});

wss.on("listening", () => {
  console.log(
    `WebSocket Server is running on port 8081 ... [${new Date().toISOString()}]`
  );
});
