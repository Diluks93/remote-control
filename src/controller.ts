import robot from 'robotjs';
import { RawData } from 'ws';
import { EOL } from 'node:os';
import { Figure } from './figure';
import { Navigate } from './navigate';

export class Controller {
  x: number;
  y: number;
  constructor(private data: RawData, private navigate: Navigate, private figure: Figure) {
    this.x = robot.getMousePos().x;
    this.y = robot.getMousePos().y;
  }

  init() {
    const [command, value] = this.data.toString().split(' ');
    switch (command) {
      case 'mouse_up':
        this.navigate.moveUp(this.x, this.y, +value);
        break;
      case 'mouse_down':
        this.navigate.moveDown(this.x, this.y, +value);
        break;
      case 'mouse_left':
        this.navigate.moveLeft(this.x, this.y, +value);
        break;
      case 'mouse_right':
        this.navigate.moveRight(this.x, this.y, +value);
        break;
      case 'draw_circle':
        this.figure.getCircle(this.x, this.y, +value);
        break;
      case 'draw_square':
        this.figure.getSquare(this.x, this.y, +value);
        break;
      case 'draw_rectangle':
        this.figure.getSquare(this.x, this.y, +value, true);
        break;
      default:
        process.stdout.write(`${command} ${this.x} px, ${this.y} px${EOL}`);
    }
    process.stdout.write(`${command} ${value} px${EOL}`);
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }
}
