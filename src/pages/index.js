// circle-link-browsers/src/pages/index.js
import React, { useState, useEffect } from 'react';
import MovingCircle from '../components/MovingCircle';

const IndexPage = () => {
  const [startMoving, setStartMoving] = useState(true);
  const ws = new WebSocket('ws://localhost:8080');

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

  const handleCircleReachEnd = () => {
    ws.send('startSecondCircle');
  };

  return <MovingCircle startMoving={startMoving} onReachEnd={handleCircleReachEnd} />;
};

export default IndexPage;
