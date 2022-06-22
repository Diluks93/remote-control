import robot from 'robotjs';

export class Figure {
  getCircle(centreX: number, centreY: number, radius: number) {
    robot.mouseToggle('down');
    for (let i = 0; i <= Math.PI * 2; i += 0.01) {
      const x = centreX - radius + radius * Math.cos(i);
      const y = centreY + radius * Math.sin(i);

      robot.dragMouse(x, y);
    }
    robot.mouseToggle('up');
  }

  getSquare(startX: number, startY: number, length: number, isRectangle = false) {
    robot.mouseToggle('down');
    let [x, y, offset] = [startX, startY, length];
    const increase = isRectangle ? 2 : 1;
    for (let i = 0; i < 4; i++) {
      const isOdd = (i: number) => i % 2 === 0;
      offset = i >= 2 ? -length : length;
      x = isOdd(i) ? x + offset : x;
      y = isOdd(i) ? y : y + increase * offset;

      robot.dragMouse(x, y);
    }
    robot.mouseToggle('up');
  }
}
