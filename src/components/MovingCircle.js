// circle-link-browsers/src/components/MovingCircle.js
import React, { useEffect, useState } from "react";

const MovingCircle = ({ startMoving }) => {
  const [position, setPosition] = useState(-100);
  const [diameter, setDiameter] = useState(0); // diameterの初期値を0に設定
  const speed = 60; // px per second
  const animationFrameRate = 60; // 60 frames per second

  useEffect(() => {
    // ウィンドウサイズに基づいてdiameterを設定
    const newDiameter = typeof window !== "undefined" ? window.innerWidth / 5 : 0;
    setDiameter(newDiameter);

    const moveCircle = () => {
      setPosition((prevPosition) => {
        const newPosition = prevPosition + speed / animationFrameRate;
        if (newPosition >= window.innerWidth - newDiameter) {
          localStorage.setItem("circleReachedEnd", "true");
          return window.innerWidth - newDiameter;
        }
        return newPosition;
      });
    };

    if (startMoving) {
      const interval = setInterval(moveCircle, 1000 / animationFrameRate);
      return () => clearInterval(interval);
    }
  }, [startMoving]);

  // diameterが設定された後でスタイルを定義
  const circleStyle = diameter > 0 && typeof window !== "undefined" ? {
    width: diameter,
    height: diameter,
    borderRadius: "50%",
    backgroundColor: "blue",
    position: "absolute",
    left: position,
    top: window.innerHeight / 2 - diameter / 2, // 中央に配置
  } : null;

  return diameter > 0 ? <div style={circleStyle} /> : null;
};

export default MovingCircle;

