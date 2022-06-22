import { WebSocketServer } from 'ws';
import { EOL } from 'os';

import { httpServer } from './src/http_server/index';

const HTTP_PORT = 3000;

process.stdout.write(`Start static http server on the ${HTTP_PORT} port! ${EOL}`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  process.stdout.write(`Connection accepted ${EOL}`);
  ws.on('message', (data) => {
    ws.send(data.toString());
  });
});
