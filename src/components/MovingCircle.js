// circle-link-browsers/src/components/MovingCircle.js
import React, { useEffect, useState } from "react";

const MovingCircle = ({ startMoving, onReachEnd }) => {
  const [position, setPosition] = useState(0);
  const [diameter, setDiameter] = useState(0);
  const speed = 120; // px per second
  const animationFrameRate = 60; // 60 frames per second

  useEffect(() => {
    const newDiameter = typeof window !== "undefined" ? window.innerWidth / 5 : 0;
    setDiameter(newDiameter);
    setPosition(-newDiameter);

    // startMovingがtrueになったときに位置をリセットし、アニメーションを開始
    if (startMoving) {
      setPosition(-newDiameter); // 位置をリセット

      const moveCircle = () => {
        setPosition((prevPosition) => {
          const newPosition = prevPosition + speed / animationFrameRate;
          if (newPosition >= window.innerWidth - newDiameter) {
            onReachEnd(); // 円が右端に到達したときのイベント
            return window.innerWidth - newDiameter;
          }
          return newPosition;
        });
      };

      const interval = setInterval(moveCircle, 1000 / animationFrameRate);
      return () => clearInterval(interval);
    }
  }, [startMoving, onReachEnd]); // onReachEndを依存配列に追加

  const circleStyle =
    diameter > 0 && typeof window !== "undefined"
      ? {
          width: diameter,
          height: diameter,
          borderRadius: "50%",
          backgroundColor: "blue",
          position: "absolute",
          left: position,
          top: window.innerHeight / 2 - diameter / 2,
        }
      : null;

  return diameter > 0 ? <div style={circleStyle} /> : null;
};

export default MovingCircle;
