const WebSocket = require('ws');

// WebSocketサーバーをポート8080で起動
const server = new WebSocket.Server({ port: 8080 });

// クライアントのコネクションを保持
const clients = new Set();

server.on('connection', (socket) => {
    console.log('新しいクライアントが接続しました');
    clients.add(socket); // 接続をセットに追加

    // クライアントからメッセージを受信
    socket.on('message', (message) => {
        console.log(`受信メッセージ: ${message}`);

        // 他のクライアントにメッセージを送信
        for (const client of clients) {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        }
    });

    // クライアントが切断した場合
    socket.on('close', () => {
        console.log('クライアントが切断されました');
        clients.delete(socket); // セットから削除
    });
});

console.log('WebSocketサーバーがポート8080で起動しました');
