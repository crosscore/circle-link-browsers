// circle-link-browsers/src/pages/websocket-server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', function connection(ws) {
  console.log('WebSocket Connected');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

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

wss.on("listening", () => {
  console.log(
    `WebSocket Server is running on port 8081 ... [${new Date().toISOString()}]`
  );
});