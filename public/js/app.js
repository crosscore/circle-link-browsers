// circle-link-browsers/public/js/app.js
const socket = io();
const circle = document.getElementById('circle');
let x = 0;
const speed = 3;
let moving = false; // 初期状態では動かない
circle.style.display = 'none'; // 最初は円を非表示にする

function moveCircle() {
    if (moving) {
        x += speed;
        socket.emit('debug', `Moving circle, x: ${x}`); // サーバーにデバッグメッセージを送信
        circle.style.left = x + 'px';
        // 円が画面の右端に到達したらイベントを送信
        if (x >= window.innerWidth) {
            socket.emit('debug', 'Circle reached the right edge of the screen'); // サーバーにデバッグメッセージを送信
            socket.emit('circleMoved');
        }
        // 円が画面の右端に完全に消えたら停止
        if (x >= window.innerWidth + circle.offsetWidth) {
            socket.emit('debug', 'Circle completely disappeared from the screen'); // サーバーにデバッグメッセージを送信
            moving = false; // 円が完全に画面から消えたら動きを停止
        }
    }
    requestAnimationFrame(moveCircle);
}

window.onload = moveCircle;
socket.on('initialize', (data) => {
    if (data.isFirstClient) {
        moving = true;
        circle.style.display = 'block'; // 最初のクライアントであれば円を表示
    } else {
        moving = false;
        x = -circle.offsetWidth; // 円の右端が画面の左端に合わせる
        circle.style.left = x + 'px';
        circle.style.display = 'none';
    }
});

socket.on('circleMove', () => {
    x = -circle.offsetWidth; // 円の右端が画面の左端に合わせる
    moving = true; // 円の動きを再開
    circle.style.display = 'block'; // 円を表示
});
