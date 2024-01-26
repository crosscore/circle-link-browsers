// public/js/client.js

console.log("クライアント側のスクリプトが読み込まれました。");

const socket = io();
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let circle;  // 円の変数を宣言

window.onload = function() {
    // キャンバスのサイズ設定
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 円の初期設定
    circle = {
        x: -300,
        y: canvas.height / 2,
        size: 300,
        dx: 2
    };

    // 最初のアップデート呼び出し
    update();
};

function drawCircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

let isCircleAtRightEdge = false;

function update() {
    console.log("更新中: x=" + circle.x + ", y=" + circle.y);
    if (circle.x + circle.size <= canvas.width) {
        drawCircle();
    }

    circle.x += circle.dx;

    if (circle.x > canvas.width) {
        if (!isCircleAtRightEdge) {
            isCircleAtRightEdge = true;
            socket.emit('circleMoved', { x: circle.x, y: circle.y, isAtRightEdge: true });
        }
    } else {
        if (isCircleAtRightEdge) {
            isCircleAtRightEdge = false;
            socket.emit('circleMoved', { x: circle.x, y: circle.y, isAtRightEdge: false });
        }
    }
    requestAnimationFrame(update);
}

socket.on('moveCircle', (data) => {
    console.log("サーバーからのデータ: ", data);
    circle.x = data.x;
    circle.y = data.y;
    isCircleAtRightEdge = data.isAtRightEdge;
});
