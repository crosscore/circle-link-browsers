// circle-link-browsers/public/js/app.js

const socket = io();

const circle = document.getElementById('circle');
let x = 0;
const speed = 1.5;
let moving = false; // 初期状態では動かない
circle.style.display = 'none'; // 最初は円を非表示にする

function moveCircle() {
    if (moving) {
        x += speed;
        circle.style.left = x + 'px';

        if (x > window.innerWidth) {
            socket.emit('circleMoved', {});
            moving = false; // 円が右端に達したら動きを停止
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
