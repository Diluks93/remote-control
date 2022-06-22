import robot from 'robotjs';
import { RawData } from 'ws';
import { EOL } from 'node:os';

export class Navigate {
  constructor(private data: RawData) {}

  init() {
    const [command, value] = this.data.toString().split(' ');
    let { x, y } = robot.getMousePos();
    switch (command) {
      case 'mouse_up':
        y -= +value;
        robot.moveMouse(x, y);
        process.stdout.write(`${command} ${y} px${EOL}`);
        break;
      case 'mouse_down':
        y += +value;
        robot.moveMouse(x, y);
        process.stdout.write(`${command} ${y} px${EOL}`);
        break;
      case 'mouse_left':
        x -= +value;
        robot.moveMouse(x, y);
        process.stdout.write(`${command} ${x} px${EOL}`);
        break;
      case 'mouse_right':
        x += +value;
        robot.moveMouse(x, y);
        process.stdout.write(`${command} ${x} px${EOL}`);
        break;
      default:
        process.stdout.write(`${command} ${x} px, ${y} px${EOL}`);
    }
  }

  getPosition() {
    return robot.getMousePos();
  }
}
