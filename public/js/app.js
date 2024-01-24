// circle-link-browsers/public/js/app.js

const socket = io();

const circle = document.getElementById('circle');
let x = 0;
const speed = 5;

function moveCircle() {
    x += speed;
    circle.style.left = x + 'px';

    // 画面の幅を超えたら、サーバーに通知
    if (x > window.innerWidth) {
        socket.emit('circleMoved', { position: x });
        x = 0; // また左から開始
    }

    requestAnimationFrame(moveCircle);
}

// ページの読み込み完了後に円を動かす
window.onload = () => {
    moveCircle();
};

// サーバーからのメッセージを受け取る
socket.on('circleMove', (data) => {
    x = data.position;
});
