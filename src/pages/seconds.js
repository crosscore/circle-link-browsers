// seconds.js
import React, { useState, useEffect } from "react";
import MovingCircle from "../components/MovingCircle";

const SecondPage = () => {
  const [startMoving, setStartMoving] = useState(false);
  const ws = new WebSocket("ws://localhost:8081");

  useEffect(() => {
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.client === "client1" && message.type === "endPosition") {
        setStartMoving(true);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div style={{ overflow: "hidden", position: "relative", width: "100vw", height: "100vh" }}>
      <MovingCircle startMoving={startMoving} ws={ws} clientName="client2" />
    </div>
  );
};

export default SecondPage;
