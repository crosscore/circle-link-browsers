// circle-link-browsers/src/pages/index.js
import React, { useState, useEffect } from 'react';
import MovingCircle from '../components/MovingCircle';

const IndexPage = () => {
  const [startMoving, setStartMoving] = useState(true);
  const ws = new WebSocket('ws://localhost:8081');

  useEffect(() => {
    ws.onopen = () => {
      console.log('WebSocket Connected');
    };

    ws.onclose = () => {
      console.log('WebSocket Disconnected');
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleCircleReachEnd = (xPosition) => {
    ws.send(`Circle reached end: ${xPosition}`);
  };

  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100vw",
        height: "100vh",
      }}
    >
      <MovingCircle startMoving={startMoving} onReachEnd={handleCircleReachEnd} />
    </div>
  );
};

export default IndexPage;
