import { CanvasDrawable } from "./canvasDrawable";
import { Text } from "./text";
import { CanvasData } from "./__canvasData";

export class RepeatedText implements CanvasDrawable {
  private texts: Text[] = [];
  private isScrolling = false;
  private scrollingSpeed = 0;

  constructor(
    public x = 0,
    public y = 0,
    private text: string,
    private font: string,
    private fontSize: number,
    private fontColor: string
  ) {
    this.init();
  }

  private createText(x: number) {
    return new Text(
      x,
      this.y,
      this.text,
      this.font,
      this.fontSize,
      this.fontColor
    );
  }

  private init() {
    let startPos = 0;
    do {
      const text = this.createText(startPos);
      this.texts.push(text);
      startPos += text.textWidth;
    } while (startPos < CanvasData.instance.width);
  }

  private rearrangeText() {
    this.texts.forEach((text, i) => {
      text.x = text.textWidth * i;
    });
  }

  public setFont(newFont: string): this {
    this.font = newFont;
    for (const text of this.texts) {
      text.setFont(newFont);
    }
    this.rearrangeText();
    return this;
  }

  public setText(newText: string): this {
    this.text = newText;
    for (const text of this.texts) {
      text.setText(this.text);
    }
    this.rearrangeText();
    return this;
  }

  public setFontSize(newSize: number): this {
    this.fontSize = newSize;
    for (const text of this.texts) {
      text.setFontSize(newSize);
    }
    this.rearrangeText();
    return this;
  }

  public setFontColor(newColor: string): this {
    this.fontColor = newColor;
    for (const text of this.texts) {
      text.setColor(newColor);
    }
    return this;
  }

  public scroll(speed: number): this {
    this.isScrolling = true;
    this.scrollingSpeed = speed;
    return this;
  }

  public scrollStop() {
    this.isScrolling = false;
    this.scrollingSpeed = 0;
  }

  public draw() {
    this.texts = this.texts.filter((text) => !text.isOutOfView);

    if (this.isScrolling) {
      let leftmostTextX = CanvasData.instance.width;
      let leftmostTextWidth = CanvasData.instance.width;
      let rightmostTextX = 0;
      for (const text of this.texts) {
        if (text.x < leftmostTextX) {
          leftmostTextX = text.x;
          leftmostTextWidth = text.textWidth;
        }
        if (text.x + text.textWidth > rightmostTextX) {
          rightmostTextX = text.x + text.textWidth;
        }
      }

      while (leftmostTextX > 0) {
        const text = this.createText(leftmostTextX - leftmostTextWidth);
        this.texts.push(text);
        leftmostTextX = text.x;
      }
      while (rightmostTextX < CanvasData.instance.width) {
        const text = this.createText(rightmostTextX);
        this.texts.push(text);
        rightmostTextX = text.x + text.textWidth;
      }
    }

    for (const text of this.texts) {
      if (this.isScrolling) {
        text.moveHorizontally(this.scrollingSpeed);
      }
      text.draw();
    }
  }
}
