// circle-link-browsers/src/components/MovingCircle.js
import React, { useEffect, useState } from "react";

const MovingCircle = ({ startMoving, onReachEnd }) => {
  const [position, setPosition] = useState(-100);
  const [diameter, setDiameter] = useState(0); // diameterをステートとして管理
  const speed = 120; // px per second
  const animationFrameRate = 60; // 60 frames per second

  useEffect(() => {
    // ウィンドウが利用可能か確認し、diameterを設定
    if (typeof window !== "undefined") {
      setDiameter(window.innerWidth / 5);
      setPosition(-window.innerWidth / 5); // 位置をリセット
    }

    const moveCircle = () => {
      setPosition((prevPosition) => {
        const newPosition = prevPosition + speed / animationFrameRate;
        if (newPosition > window.innerWidth) {
          onReachEnd();
          return window.innerWidth; // Stop the circle when it reaches the end of the screen
        }
        return newPosition;
      });
    };

    if (startMoving) {
      const interval = setInterval(moveCircle, 1000 / animationFrameRate);
      return () => clearInterval(interval);
    }
  }, [startMoving, onReachEnd]);

  // スタイルを動的に生成
  const circleStyle =
    diameter > 0
      ? {
          width: diameter,
          height: diameter,
          borderRadius: "50%",
          backgroundColor: "blue",
          position: "absolute",
          left: position,
          top:
            typeof window !== "undefined"
              ? window.innerHeight / 2 - diameter / 2
              : 0, // Center vertically
        }
      : null;

  return diameter > 0 ? <div style={circleStyle} /> : null;
};

export default MovingCircle;
