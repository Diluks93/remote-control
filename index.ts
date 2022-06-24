import { WebSocketServer, createWebSocketStream, RawData } from 'ws';
import { EOL } from 'os';

import { httpServer } from './src/http_server/index';
import { Controller } from './src/controller';
import { Figure } from './src/figure';
import { Navigate } from './src/navigate';
import { PrintScreen } from './src/printScrn';

const HTTP_PORT = 3000;

process.stdout.write(`Start static http server on the ${HTTP_PORT} port! ${EOL}`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  process.stdout.write(`Connection accepted ${EOL}`);
  const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });
  duplex.on('data', async (chunk: RawData) => {
    const controller = new Controller(chunk, new Navigate(), new Figure());
    const { x, y } = controller.getPosition();
    if (chunk.toString().split(' ')[0] === 'prnt_scrn') {
      const prnt_scrn = new PrintScreen();
      const bufferImage = await prnt_scrn.init(x, y);
      duplex.write(`prnt_scrn ${bufferImage}`);
      return;
    }
    controller.init();
    duplex.write(`${chunk} ${x},${y}`);
  });
  ws.on('close', () => {
    process.stdout.write(`Connection destroyed ${EOL}`);
  });
});
