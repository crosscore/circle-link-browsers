// circle-link-browsers/src/pages/second.js
import React, { useState, useEffect } from 'react';
import MovingCircle from '../components/MovingCircle';

const SecondPage = () => {
  const [startMoving, setStartMoving] = useState(false);
  const ws = new WebSocket("ws://localhost:8081");

  useEffect(() => {
    ws.onmessage = (event) => {
      if (event.data === "startSecondCircle") {
        setStartMoving(true);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket Disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100vw",
        height: "100vh",
      }}
    >
      <MovingCircle startMoving={startMoving} />
    </div>
  );
};

export default SecondPage;
