export interface FillWrapTextOptions {
  text : string;
  ctx : CanvasRenderingContext2D;
  x : number;
  y : number;
  width : number;
  height : number;
  lineHeight? : number;
}

let _cachedCanvas
export function fillTextWithWrapping({
  text,
  ctx,
  x,
  y,
  width,
  height,
  lineHeight
} : FillWrapTextOptions) {
  // _cachedCanvas = _cachedCanvas || document.createElement('canvas')
  // 
  ctx.fillText(text, x, y)
}