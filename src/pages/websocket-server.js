// circle-link-browsers/src/pages/websocket-server.js

const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });
let lastLogTime = Date.now();

wss.on("connection", function connection(ws) {
  console.log("WebSocket Connected");

  ws.on("message", function incoming(message) {
    // 0.5秒以上経過した場合のみログを出力
    const now = Date.now();
    if (now - lastLogTime > 500) {
      console.log("received: %s", message);
      lastLogTime = now;
    }

    // 特定のメッセージを受け取ったら他のクライアントにブロードキャストする
    if (message === "startSecondCircle") {
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    }
  });
});
