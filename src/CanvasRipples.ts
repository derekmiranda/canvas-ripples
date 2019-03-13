import Ripple from "./Ripple";

const queueNextFrame = requestAnimationFrame;

function distBwTwoPoints(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
}

// ripple is finished whenever radius equals the longest line
// b/w the ripple origin and either of the canvas' four corners
function rippleFinished(ripple: Ripple, canvasWidth, canvasHeight) {
  const radius = ripple.radius;
  const canvasMidX = canvasWidth / 2;
  const canvasMidY = canvasHeight / 2;

  if (radius < Math.max(canvasMidX, canvasMidY)) return false;

  const rippleX = ripple.x;
  const rippleY = ripple.y;

  // get distance b/w ripple origin and farthest corner
  const farthestCornerX = rippleX < canvasMidX ? canvasWidth : 0;
  const farthestCornerY = rippleY < canvasMidY ? canvasHeight : 0;
  const farthestDist = distBwTwoPoints(
    rippleX,
    rippleY,
    farthestCornerX,
    farthestCornerY
  );

  return radius > farthestDist;
}

interface CanvasRipplesSettings {
  color: string;
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
  public redrawCb?: Function;
  private _clickSurface: Window | EventTarget;

  constructor({
    color,
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
    this.redrawCb = redrawCb;
    this._clickSurface = clickSurface;

    this.context.lineWidth = lineWidth;

    const _touchHandler = this.touchHandler.bind(this);

    this._clickSurface.addEventListener("click", _touchHandler);
    this._clickSurface.addEventListener("touchend", _touchHandler);

    // this.canvas.addEventListener("click", _touchHandler);
    // this.canvas.addEventListener("touchend", _touchHandler);
  }

  touchHandler(event) {
    // event.preventDefault();
    event.stopPropagation();

    const x = event.clientX;
    const y = event.clientY;

    const ripple = new Ripple({
      x,
      y,
      color: this.color
    });
    this.ripples.push(ripple);

    if (!this.playing) {
      this.playing = true;
      this.play();
    }
  }

  play() {
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

        const { x, y, radius, color } = ripple;

        this.context.strokeStyle = color;
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
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
