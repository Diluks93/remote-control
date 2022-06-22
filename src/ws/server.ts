import WebSocket, { WebSocketServer } from 'ws';

new WebSocket('ws:/localhost');
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws: WebSocket) => {
  ws.on('message', (data: string) => {
    process.stdout.write(data);
  });

  ws.send('something');
});

wss.on('close', () => {
  process.stdout.write('server closed');
});
