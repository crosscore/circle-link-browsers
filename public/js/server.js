// circle-link-browsers/public/js/server.js

// 必要なモジュールをインポート
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Expressアプリケーションの作成
const app = express();

// HTTPサーバーの作成
const server = http.createServer(app);

// Socket.ioの初期化
const io = socketIo(server);

// クライアントからの接続を監視
io.on('connection', (socket) => {
    console.log('A user connected');

    // クライアントからメッセージを受け取った時の処理
    socket.on('circleMoved', (data) => {
        // 他のクライアントにメッセージを中継
        io.emit('circleMove', data);
    });

    // 接続が切断された時の処理
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// サーバーをポート3000で起動
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});


// 静的ファイルを提供するための設定
app.use(express.static('public'));
