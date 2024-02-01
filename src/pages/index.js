// circle-link-browsers/src/pages/index.js
import React, { useState, useEffect } from "react";
import MovingCircle from "../components/MovingCircle";

const IndexPage = () => {
  const [startMoving, setStartMoving] = useState(true);
  const ws = new WebSocket("ws://localhost:8081");

const handleCircleReachEnd = (xPosition, diameter) => {
  let circlePositionRight = xPosition + diameter;
  if (circlePositionRight >= window.innerWidth) {  // browserWindowWidthの代わりにwindow.innerWidthを使用
    ws.send(JSON.stringify({ client: 'client1', type: 'endPosition', value: circlePositionRight }));
  }
};


  return (
    <div style={{ overflow: "hidden", position: "relative", width: "100vw", height: "100vh" }}>
      <MovingCircle startMoving={startMoving} onReachEnd={handleCircleReachEnd} ws={ws} clientName="client1" />
    </div>
  );
};

export default IndexPage;
