// circle-link-browsers/src/pages/websocket-server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('WebSocket Connected');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    // ここでメッセージに基づいて何か処理を行う
    // 例えば、特定のメッセージを受け取ったら他のクライアントにブロードキャストする
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('WebSocket Disconnected');
  });
});

