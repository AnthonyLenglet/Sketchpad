import { CanvasDrawable } from "./canvasDrawable";
import { CanvasData } from "./__canvasData";

export class Text implements CanvasDrawable {
  private context = CanvasData.instance.context;

  constructor(
    public x = 0,
    public y = 0,
    private text: string,
    private font: string,
    private fontSize: number,
    private fontColor: string
  ) {}

  get textWidth(): number {
    this.context.font = `${this.fontSize}px ${this.font}`;
    return this.context.measureText(this.text).width;
  }

  get isOutOfView(): boolean {
    return this.x < -this.textWidth || CanvasData.instance.width < this.x;
  }

  public setFont(newFont: string): this {
    this.font = newFont;
    return this;
  }

  public setFontSize(newSize: number): this {
    this.fontSize = newSize;
    return this;
  }

  public setText(newText: string): this {
    this.text = newText;
    return this;
  }

  public setColor(newColor: string): this {
    this.fontColor = newColor;
    return this;
  }

  public moveHorizontally(distance: number) {
    this.x += distance;
  }

  public draw() {
    this.context.font = `${this.fontSize}px ${this.font}`;
    this.context.fillStyle = this.fontColor;
    this.context.fillText(this.text, this.x, this.y);
  }
}
