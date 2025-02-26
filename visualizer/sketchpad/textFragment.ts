import { CanvasDrawable } from "./canvasDrawable";

export class TextFragment {
  constructor(
    private text: string,
    private font: string,
    private fontSize: number,
    private fontColor: string
  ) {}
}
