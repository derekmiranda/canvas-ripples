import Ripple from "./Ripple";
import { rippleFinished } from "./anim-utils";

const queueNextFrame = requestAnimationFrame;

interface CanvasRipplesSettings {
  color: string;
  fillColor?: string;
  canvas?: HTMLCanvasElement;
  lineWidth?: number;
  redrawCb?: Function;
  clickSurface?: Window | EventTarget;
}

class CanvasRipples {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public ripples: Array<Ripple>;
  public playing: boolean;
  public color: string;
  public fillColor: string;
  public redrawCb?: Function;
  private _clickSurface: Window | EventTarget;

  constructor({
    color,
    fillColor = "white",
    canvas,
    redrawCb,
    clickSurface = window,
    lineWidth = 2
  }: CanvasRipplesSettings) {
    this.canvas = canvas || document.createElement("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext("2d");
    this.ripples = [];
    this.playing = false;
    this.color = color;
    this.fillColor = fillColor;
    this.redrawCb = redrawCb;
    this._clickSurface = clickSurface;
    this.context.lineWidth = lineWidth;
  }

  public start() {
    const _touchHandler = this.touchHandler.bind(this);
    this._clickSurface.addEventListener("click", _touchHandler);
    this._clickSurface.addEventListener("touchend", _touchHandler);
  }

  private touchHandler(event) {
    event.stopPropagation();

    const x = event.clientX;
    const y = event.clientY;

    const ripple = new Ripple({
      x,
      y
    });
    this.ripples.push(ripple);

    if (!this.playing) {
      this.playing = true;
      this.play();
    }
  }

  public addRipple(ripple: Ripple): void {
    this.ripples.push(ripple);
  }

  public play() {
    if (this.ripples.length) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // call redraw callback if any
      if (this.redrawCb) {
        this.redrawCb(this.canvas, this.context);
      }

      for (let i = 0; i < this.ripples.length; ) {
        const ripple = this.ripples[i];

        // remove ripple if going to be offscreen
        if (rippleFinished(ripple, this.canvas.width, this.canvas.height)) {
          this.ripples.splice(i, 1);
          continue;
        }

        const { x, y, radiusToCanvasWidth } = ripple;

        this.context.strokeStyle = this.color;
        this.context.beginPath();
        this.context.arc(
          x,
          y,
          radiusToCanvasWidth * window.innerWidth,
          0,
          2 * Math.PI
        );
        this.context.stroke();
        ripple.update();

        i += 1;
      }

      queueNextFrame(this.play.bind(this));
      return;
    }

    this.playing = false;
  }
}

export default CanvasRipples;
