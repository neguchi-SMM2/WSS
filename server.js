const WebSocket = require('ws');
const express = require('express');

// Expressアプリを作成
const app = express();

// WebSocketサーバーを作成
const wss = new WebSocket.Server({ noServer: true });

// WebSocket接続時の処理
wss.on('connection', (ws) => {
  console.log('New WebSocket connection');
  
  // メッセージ受信時の処理
  ws.on('message', (message) => {
    console.log('Received: %s', message);
  });

  // クライアントにメッセージを送信
  ws.send('Hello, WebSocket client!');
});

// HTTPサーバーを作成して、WebSocketをリクエストに対してハンドル
app.server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
});

app.server.on('upgrade', (request, socket, head) => {
  // WebSocket接続のアップグレード処理
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});
