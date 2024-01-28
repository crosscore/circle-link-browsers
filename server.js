// circle-link-browser/server.js

// 必要なモジュールをインポート
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // 追加

// ExpressアプリケーションとHTTPサーバーの作成
const app = express();
const server = http.createServer(app);

// 静的ファイルを提供するための設定（Reactアプリケーションのビルドファイルを提供）
app.use(express.static(path.join(__dirname, 'client/build')));

// Socket.ioの初期化
const io = socketIo(server);

let firstClient = null;

// 日付をフォーマットする関数
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toISOString();
};

// クライアントからの接続を監視
io.on('connection', (socket) => {
  // 以下は変更なし
});

// 全てのリクエストをReactアプリケーションにリダイレクト
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// サーバーをポート3000で起動
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
