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

  // rerender on resize
  window.addEventListener("resize", () => {
    // TODO:
    // * add debouncer
    // * resize canvases
    // * clear ripples and canvas text
    // * make actual text fields visible again
    // * rerender
  });

  // hide text canvas
  textCtx.canvas.style.opacity = "0";
  window.addEventListener("load", () => {
    openingRipple({
      canvasRipples,
      ripplesCtx: canvasRipples.context,
      textCtx
    }).then(() => {
      const ripplesCtx = canvasRipples.context;
      ripplesCtx.clearRect(
        0,
        0,
        ripplesCtx.canvas.width,
        ripplesCtx.canvas.height
      );
      canvasRipples.start();
      textCtx.canvas.style.opacity = "1";
    });
  });
}
main();
