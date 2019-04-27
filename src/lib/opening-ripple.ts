import CanvasRipples from "./CanvasRipples";
import Ripple from "./Ripple";
import { queueNextFrame, rippleFinished } from "./anim-utils";

export default function openingRippleAnimation({
  canvasRipples,
  ripplesCtx,
  textCtx
}: {
  canvasRipples: CanvasRipples;
  ripplesCtx: CanvasRenderingContext2D;
  textCtx: CanvasRenderingContext2D;
}): Promise<void> {
  const openingRipple = new Ripple({
    x: ~~(canvasRipples.canvas.width / 2),
    y: ~~(canvasRipples.canvas.height / 2)
  });

  return new Promise(resolve =>
    renderClippedText({
      openingRipple,
      ripplesCtx,
      textCanvas: textCtx.canvas,
      onComplete: resolve
    })
  );
}

function renderClippedText({
  openingRipple,
  ripplesCtx,
  textCanvas,
  onComplete
}: {
  openingRipple: Ripple;
  ripplesCtx: CanvasRenderingContext2D;
  textCanvas: HTMLCanvasElement;
  onComplete?: Function;
}): void {
  const canvas = ripplesCtx.canvas;
  if (rippleFinished(openingRipple, canvas.width, canvas.height)) {
    onComplete && onComplete();
  } else {
    // clear rect for subsequent renders
    ripplesCtx.clearRect(0, 0, canvas.width, canvas.height);

    // save unclipped state
    ripplesCtx.save();

    // clip w/ current ripple arc
    ripplesCtx.beginPath();
    ripplesCtx.arc(
      openingRipple.x,
      openingRipple.y,
      openingRipple.radiusToCanvasLen * Math.max(canvas.width, canvas.height),
      0,
      2 * Math.PI
    );
    ripplesCtx.clip();

    // draw canvas-rendered text into ripple canvas
    ripplesCtx.drawImage(textCanvas, 0, 0);
    ripplesCtx.stroke();

    // reset clip state
    ripplesCtx.restore();

    // update ripple dimensions
    openingRipple.update();

    // rerender
    queueNextFrame(() => {
      renderClippedText({
        openingRipple,
        ripplesCtx,
        textCanvas,
        onComplete
      });
    });
  }
}
