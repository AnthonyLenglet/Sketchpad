export class CanvasData {
  public static instance = new CanvasData();
  public canvas: HTMLCanvasElement = null;
  public context: CanvasRenderingContext2D = null;

  private constructor() {}

  get height() {
    return this.canvas.height;
  }
  set height(height) {
    this.canvas.height = height;
  }

  get width() {
    return this.canvas.width;
  }
  set width(width) {
    this.canvas.width = width;
  }
}
