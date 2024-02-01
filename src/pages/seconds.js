// seconds.js
import React, { useState, useEffect } from "react";
import MovingCircle from "../components/MovingCircle";

const SecondPage = () => {
  const [startMoving, setStartMoving] = useState(false);
  const ws = new WebSocket("ws://localhost:8081");

  useEffect(() => {
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // Check if the message indicates that Circle 1 has reached the end
      if (message.type === "endPosition") {
        setStartMoving(true); // Start moving Circle 2
      }
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
      <MovingCircle startMoving={startMoving} ws={ws} />
    </div>
  );
};

export default SecondPage;
