import CanvasRipples from "./CanvasRipples";

const MAIN_COLOR = "teal";

function initContext(ctx) {
  ctx.font = "20px Futura";
  ctx.fillStyle = MAIN_COLOR;
}

function drawText(ctx) {
  ctx.fillText(
    "derek miranda",
    window.innerWidth * 0.2,
    window.innerHeight / 3
  );
  ctx.fillText(
    "developer",
    window.innerWidth * 0.2,
    window.innerHeight / 3 + 30
  );
}

window.canvasRipples = new CanvasRipples({
  color: MAIN_COLOR,
  redrawCb: drawText
});

initContext(canvasRipples.context);
drawText(canvasRipples.context);

document.body.appendChild(canvasRipples.canvas);
