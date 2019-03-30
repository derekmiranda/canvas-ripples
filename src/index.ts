import CanvasRipples from "./CanvasRipples";
import { fitCanvas } from "./dom";
import { renderContentToContext } from "./text-render";

const MAIN_COLOR = "#555";

function initTextContext(ctx) {
  ctx.font = "16px Futura";
  ctx.fillStyle = MAIN_COLOR;
}

function bg(canvas, ctx) {
  const currFill = ctx.fillStyle
  ctx.fillStyle = 'rgba(123,10,23,0.4)'
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = currFill
}

function main() {
  const ripplesCanvas : HTMLCanvasElement = document.getElementById("ripples-canvas");
  const textCanvas : HTMLCanvasElement = document.getElementById('text-canvas')

  fitCanvas(ripplesCanvas)
  fitCanvas(textCanvas)

  const canvasRipples = window.canvasRipples = new CanvasRipples({
    color: MAIN_COLOR,
    canvas: ripplesCanvas,
  });

  const textContext : CanvasRenderingContext2D = textCanvas.getContext('2d')
  initTextContext(textContext);
  renderContentToContext(textContext)

}

main()