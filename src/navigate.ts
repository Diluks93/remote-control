import robot from 'robotjs';

export class Navigate {
  moveUp(x: number, y: number, value: number) {
    y -= +value;
    robot.moveMouse(x, y);
  }

  moveDown(x: number, y: number, value: number) {
    y += +value;
    robot.moveMouse(x, y);
  }

  moveLeft(x: number, y: number, value: number) {
    x -= +value;
    robot.moveMouse(x, y);
  }

  moveRight(x: number, y: number, value: number) {
    x += +value;
    robot.moveMouse(x, y);
  }
}
