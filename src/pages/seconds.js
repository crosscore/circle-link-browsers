// circle-link-browsers/src/pages/second.js
import React, { useState, useEffect } from "react";
import MovingCircle from "../components/MovingCircle";

const SecondPage = () => {
  const [startMoving, setStartMoving] = useState(false);
  const ws = new WebSocket("ws://localhost:8080");

  useEffect(() => {
    ws.onmessage = (event) => {
      if (event.data === "startSecondCircle") {
        setStartMoving(true);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return <MovingCircle startMoving={startMoving} />;
};

export default SecondPage;
