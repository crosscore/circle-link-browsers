// circle-link-browsers/public/js/app.js
const socket = io();
const circle = document.getElementById('circle');
let x = 0;
const speed = 3;
let moving = false; // 初期状態では動かない
let isFirstClient = false; // 最初のクライアントかどうかを追跡するフラグ

function moveCircle() {
    if (moving) {
        x += speed;
        // 最初のクライアントかどうかに基づいて異なるデバッグメッセージを出力
        if (isFirstClient) {
            socket.emit('debug', `First client moving circle, x: ${x}`);
        } else {
            socket.emit('debug', `Following client moving circle, x: ${x}`);
        }
        circle.style.left = x + 'px';

        // 円が画面の右端に到達したらイベントを送信
        if (x >= window.innerWidth) {
            socket.emit('debug', 'Circle reached the right edge of the screen');
            socket.emit('circleMoved');
        }
        // 円が画面の右端に完全に消えたら停止
        if (x >= window.innerWidth + circle.offsetWidth) {
            socket.emit('debug', 'Circle completely disappeared from the screen');
            moving = false;
        }
    }
    requestAnimationFrame(moveCircle);
}

window.onload = moveCircle;

socket.on('initialize', (data) => {
    isFirstClient = data.isFirstClient;
    if (isFirstClient) {
        x = -circle.offsetWidth // 円の右端を画面の左端に合わせる
        moving = true;
        circle.style.display = 'block'; // 円を表示
    } else {
        moving = false;
        x = -circle.offsetWidth; // 円の右端を画面の左端に合わせる
        circle.style.left = x + 'px';
        circle.style.display = 'block'; // 円を表示
    }
});

socket.on('circleMove', () => {
    x = -circle.offsetWidth; // 円の右端を画面の左端に合わせる
    moving = true; // 円の動きを再開
    circle.style.display = 'block'; // 円を表示
});
