import robot from 'robotjs';
import Jimp from 'jimp';

export class PrintScreen {
  async init(x: number, y: number) {
    const img = robot.screen.capture(x - 100, y - 100, 200, 200);
    const image = new Jimp({
      data: img.image,
      width: img.width,
      height: img.height,
    });
    const base64 = (await image.getBase64Async(Jimp.MIME_PNG)).split(',')[1];
    return base64;
  }
}
