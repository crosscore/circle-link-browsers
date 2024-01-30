// circle-link-browsers/src/pages/index.js
import React, { useState, useEffect } from "react";
import MovingCircle from "../components/MovingCircle";

const IndexPage = () => {
  const [startMoving, setStartMoving] = useState(true);

  // TODO: 画面2からの信号を受け取ったら setStartMoving(true) を実行する
  useEffect(() => {
    const handleStorageChange = () => {
      if (localStorage.getItem("circleReachedEnd") === "true") {
        setStartMoving(false); // 円1のアニメーションを停止
        localStorage.removeItem("circleReachedEnd"); // フラグをリセット
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return <MovingCircle startMoving={startMoving} />;
};

export default IndexPage;
