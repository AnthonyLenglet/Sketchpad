import { CanvasDrawable } from "./canvasDrawable";
import { RepeatedText } from "./line";
import { CanvasData } from "./__canvasData";

export class Canvas {
  private drawables: CanvasDrawable[] = [];
  private instance = CanvasData.instance;

  constructor(canvas: HTMLCanvasElement) {
    this.instance.canvas = canvas;
    this.instance.context = canvas.getContext("2d");
    this.setToWindowSize();
    this.enableDynamicSize();
    window.requestAnimationFrame(() => this.draw());
  }

  get height(): number {
    return this.instance.height;
  }

  get width(): number {
    return this.instance.width;
  }

  public setSize(width: number, height: number) {
    this.instance.width = width;
    this.instance.height = height;
  }

  private setToWindowSize() {
    this.instance.width = window.innerWidth;
    this.instance.height = window.innerHeight;
    console.log("resized");
  }

  public enableDynamicSize() {
    window.addEventListener("resize", () => this.setToWindowSize());
  }

  public disableDynamicSize() {
    window.removeEventListener("resize", () => this.setToWindowSize());
  }

  public addRepeatedText(
    x: number,
    y: number,
    text = "EMPTY",
    font = "Arial",
    fontSize = 14,
    fontColor = "#000000"
  ): RepeatedText {
    const line = new RepeatedText(x, y, text, font, fontSize, fontColor);
    this.drawables.push(line);
    return line;
  }

  public clear() {
    this.drawables = [];
  }

  public draw() {
    this.instance.context.clearRect(
      0,
      0,
      this.instance.width,
      this.instance.height
    );
    for (const drawable of this.drawables) {
      drawable.draw();
    }
    window.requestAnimationFrame(() => this.draw());
  }
}
