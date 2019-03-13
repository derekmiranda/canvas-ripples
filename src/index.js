import rasterizeHTML from "rasterizehtml";

import CanvasRipples from "./CanvasRipples.ts";
import html from "./intro.html";

const MAIN_COLOR = "#ccc";

function initContext(canvas, ctx) {
  ctx.font = "20px Futura";
  ctx.fillStyle = MAIN_COLOR;
}

function drawText(canvas, ctx) {
  rasterizeHTML.drawHTML(html, canvas);
}

window.canvasRipples = new CanvasRipples({
  color: MAIN_COLOR,
  redrawCb: drawText
});

initContext(canvasRipples.canvas, canvasRipples.context);
drawText(canvasRipples.canvas);

document.body.appendChild(canvasRipples.canvas);
