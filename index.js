const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
    console.log('クライアントが接続しました');

    socket.on('message', (message) => {
        console.log('受信:', message);
        socket.send(`サーバーから: ${message}`);
    });

    socket.on('close', () => {
        console.log('クライアントが切断しました');
    });
});

console.log('WebSocketサーバーがポート8080で起動しました');
