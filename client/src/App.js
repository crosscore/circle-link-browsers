// circle-link-browsers/client/src/App.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import CanvasComponent from './components/CanvasComponent'; // CanvasComponentのインポート

const App = () => {
  const [isFirstClient, setIsFirstClient] = useState(false);

  // Socket.ioのインスタンスを作成
  const socket = io();

  // コンポーネントのマウント時に実行されるエフェクト
  useEffect(() => {
    // サーバーからのメッセージを受け取るイベントハンドラ
    socket.on('initialize', (data) => {
      setIsFirstClient(data.isFirstClient);
    });

    // コンポーネントのアンマウント時にイベントハンドラをクリーンアップ
    return () => {
      socket.off('initialize');
    };
  }, [socket]);

  return (
    <div>
      {/* CanvasComponentの表示 */}
      <CanvasComponent isFirstClient={isFirstClient} />
    </div>
  );
};

export default App;
