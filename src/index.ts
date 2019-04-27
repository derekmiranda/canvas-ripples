import CanvasRipples from "./lib/CanvasRipples";
import { fitCanvas } from "./lib/dom";
import {
  renderContentToContext,
  initContentTextRendering
} from "./lib/text-render";
import openingRipple from "./lib/opening-ripple";

const MAIN_COLOR = "#555";

function main() {
  const ripplesCanvas = <HTMLCanvasElement>(
    document.getElementById("ripples-canvas")
  );
  const textCanvas = <HTMLCanvasElement>document.getElementById("text-canvas");

  fitCanvas(ripplesCanvas);
  fitCanvas(textCanvas);

  const canvasRipples = ((<any>window).canvasRipples = new CanvasRipples({
    color: MAIN_COLOR,
    canvas: ripplesCanvas
  }));

  const textCtx: CanvasRenderingContext2D = textCanvas.getContext("2d");
  initContentTextRendering(textCtx, MAIN_COLOR);
  renderContentToContext();

  openingRipple({
    canvasRipples,
    ripplesCtx: canvasRipples.context,
    textCtx,
    rippleColor: MAIN_COLOR
  }).then(() => {
    canvasRipples.start();
  });
}
main();
