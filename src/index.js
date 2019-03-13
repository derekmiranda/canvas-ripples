import CanvasRipples from "./CanvasRipples.ts";
import html from "./intro.html";

const MAIN_COLOR = "#aaa";

function initContext(canvas, ctx) {
  ctx.font = "20px Futura";
  ctx.fillStyle = MAIN_COLOR;
}

function drawText(canvas, ctx) {
  ctx.fillText("derek miranda", canvas.width / 4, canvas.height / 4);
}

window.canvasRipples = new CanvasRipples({
  color: MAIN_COLOR,
  redrawCb: drawText
});

initContext(canvasRipples.canvas, canvasRipples.context);
drawText(canvasRipples.canvas, canvasRipples.context);

document.body.appendChild(canvasRipples.canvas);
