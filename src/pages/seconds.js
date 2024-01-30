// circle-link-browsers/src/pages/second.js
import React, { useState, useEffect } from "react";
import MovingCircle from "../components/MovingCircle";

const SecondPage = () => {
  const [startMoving, setStartMoving] = useState(false);

  // TODO: 画面1からの信号を受け取ったら setStartMoving(true) を実行する
  useEffect(() => {
    const handleStorageChange = () => {
      if (localStorage.getItem("circleReachedEnd") === "true") {
        setStartMoving(true); // 円2のアニメーションを開始
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return <MovingCircle startMoving={startMoving} />;
};

export default SecondPage;
