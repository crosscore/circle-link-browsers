// circle-link-browsers/src/components/MovingCircle.js
import React, { useEffect, useState } from "react";

const MovingCircle = ({ startMoving, onReachEnd, ws, clientName }) => {
  const [position, setPosition] = useState(0); // px
  const [diameter, setDiameter] = useState(0);
  const speed = 120; // px per second
  const animationFrameRate = 60; // 60 frames per second

  useEffect(() => {
    if (typeof window !== "undefined") {
      const newDiameter = window.innerWidth / 5;
      setDiameter(newDiameter);
      setPosition(-newDiameter);

      // Send circle diameter to the server as a WebSocket message
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ client: clientName, type: "diameter", value: newDiameter }));
      }
    }

    const moveCircle = () => {
      setPosition((prevPosition) => {
        const newPosition = prevPosition + speed / animationFrameRate;
        if (newPosition + diameter >= window.innerWidth) {
          onReachEnd(newPosition);
          // Send end position to the server
          ws.send(JSON.stringify({ client: clientName, type: "endPosition", value: newPosition }));
        } else {
          // Send new position updates to the server
          ws.send(JSON.stringify({ client: clientName, type: "newPosition", value: newPosition }));
        }
        return Math.min(newPosition, window.innerWidth); // Prevent the circle from going beyond the right edge
      });
    };

    if (startMoving) {
      const interval = setInterval(moveCircle, 1000 / animationFrameRate);
      return () => clearInterval(interval);
    }
  }, [startMoving, onReachEnd, diameter, ws, clientName]);

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
