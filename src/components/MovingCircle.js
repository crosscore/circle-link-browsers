// circle-link-browsers/src/components/MovingCircle.js
import React, { useEffect, useState } from "react";

const MovingCircle = ({ startMoving, onReachEnd }) => {
  const [position, setPosition] = useState(0); // px
  const [diameter, setDiameter] = useState(0);
  const speed = 120; // px per second
  const animationFrameRate = 60; // 60 frames per second

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Set the diameter to 1/5 of the screen width
      setDiameter(window.innerWidth / 5);
      // Set the starting position to the left of the screen
      setPosition(-window.innerWidth / 5);
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

  // Set the circle style
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
