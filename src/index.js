import CanvasRipples from "./CanvasRipples.ts";
import html from "./intro.html";

const MAIN_COLOR = "#ccc";

function initContext(canvas, ctx) {
  // ctx.font = "20px Futura";
  // ctx.fillStyle = MAIN_COLOR;
}

function bg(canvas, ctx) {
  // ctx.fillText("derek miranda", canvas.width / 4, canvas.height / 4);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const canvas = document.getElementById("canvas");
window.canvasRipples = new CanvasRipples({
  color: MAIN_COLOR,
  canvas
  // redrawCb: bg
});

initContext(canvasRipples.canvas, canvasRipples.context);
// bg(canvasRipples.canvas, canvasRipples.context);

// document.body.appendChild(canvasRipples.canvas);
