import { WebSocketServer } from 'ws';
import { EOL } from 'os';

import { httpServer } from './src/http_server/index';
import { Controller } from './src/controller';
import { Figure } from './src/figure';
import { Navigate } from './src/navigate';

const HTTP_PORT = 3000;

process.stdout.write(`Start static http server on the ${HTTP_PORT} port! ${EOL}`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  process.stdout.write(`Connection accepted ${EOL}`);
  ws.on('message', (data) => {
    const controller = new Controller(data, new Navigate(), new Figure());
    controller.init();
    const { x, y } = controller.getPosition();
    ws.send(`${data} ${x},${y}`);
  });
});
