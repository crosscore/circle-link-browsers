// circle-link-browsers/client/src/components/CanvasComponent.js
import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [circle, setCircle] = useState({ x: -300, y: 0, size: 300, dx: 2 });
  const [isCircleAtRightEdge, setIsCircleAtRightEdge] = useState(false);

  const socket = io();

  const drawCircle = (ctx, x, y, size) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setCircle(c => ({ ...c, y: canvas.height / 2 }));
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // 初期サイズ設定
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const update = () => {
    setCircle(prevCircle => {
      const newX = prevCircle.x + prevCircle.dx;
      if (newX > window.innerWidth && !isCircleAtRightEdge) {
        setIsCircleAtRightEdge(true);
        socket.emit('circleMoved', { ...prevCircle, x: newX, isAtRightEdge: true });
      } else if (newX <= window.innerWidth && isCircleAtRightEdge) {
        setIsCircleAtRightEdge(false);
        socket.emit('circleMoved', { ...prevCircle, x: newX, isAtRightEdge: false });
      }
      return newX + prevCircle.size <= window.innerWidth ? { ...prevCircle, x: newX } : prevCircle;
    });
  };

  useEffect(() => {
    const animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [circle, update]);

  useEffect(() => {
    socket.on('moveCircle', (data) => {
      setCircle(prevCircle => ({ ...prevCircle, x: data.x, y: data.y }));
      setIsCircleAtRightEdge(data.isAtRightEdge);
    });
    return () => socket.off('moveCircle');
  }, [socket]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    drawCircle(ctx, circle.x, circle.y, circle.size);
  }, [circle]);

  return <canvas ref={canvasRef} />;
};

export default CanvasComponent;
