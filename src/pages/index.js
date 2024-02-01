// circle-link-browsers/src/pages/index.js
import React, { useState, useEffect } from "react";
import MovingCircle from "../components/MovingCircle";

const IndexPage = () => {
  const [startMoving, setStartMoving] = useState(true);
  const ws = new WebSocket("ws://localhost:8081");

  // WebSocket connection setup and cleanup...

  const handleCircleReachEnd = (xPosition) => {
    // Send a message with the xPosition
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "endPosition", value: xPosition }));
    }
  };

  return (
    <div style={{overflow: "hidden", position: "relative", width: "100vw", height: "100vh",}}>
      <MovingCircle startMoving={startMoving} onReachEnd={handleCircleReachEnd} ws={ws} />
    </div>
  );
};

export default IndexPage;
