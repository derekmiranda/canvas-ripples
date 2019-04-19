import {CanvasTextWrapper as renderWrappedText} from 'canvas-text-wrapper'

export interface WrappedTextRendererOptions {
  mainCtx: CanvasRenderingContext2D;
  x: number;
  y: number;
  font: string;
  width: number;
  height: number;
  lineHeight?: number;
}

let _cachedCanvas
export class WrappedTextRenderer {
  public x: number;
  public y: number;
  public lineHeight: number;
  public font: string;
  public mainCtx: CanvasRenderingContext2D;
  private _wrapCanvas: HTMLCanvasElement;
  private _wrapCtx: CanvasRenderingContext2D;
  constructor({
    mainCtx,
    font,
    x,
    y,
    width,
    height,
    lineHeight
  } : WrappedTextRendererOptions) {
    this.x = x
    this.y = y
    this.font = font
    this.mainCtx = mainCtx
    this._wrapCanvas = document.createElement('canvas')
    this._wrapCtx = this._wrapCanvas.getContext('2d')
    this.reformat({ width, height, font })    
  }

  public reformat({ width, height, font }) : void {
    if (width) this._wrapCanvas.width = width
    if (height) this._wrapCanvas.height = height
    if (font) this._wrapCtx.font = font
  }

  public render(text) {
    renderWrappedText(this._wrapCanvas, text, { font: this.font, lineHeight: this.lineHeight })
    // get image data
    // write to main context
  }
}