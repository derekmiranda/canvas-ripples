import Ripple from "./Ripple";

const RIPPLE_LIMIT = Infinity;
const queueNextFrame = requestAnimationFrame;

class CanvasRipples {
  constructor({ color, redrawCb } = {}) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext("2d");
    this.ripples = [];
    this.playing = false;
    this.color = color;
    this.redrawCb = redrawCb;

    const _touchHandler = this.touchHandler.bind(this);

    this.canvas.addEventListener("click", _touchHandler);
    this.canvas.addEventListener("touchend", _touchHandler);
  }

  touchHandler(event) {
    const x = event.clientX;
    const y = event.clientY;

    if (this.ripples.length < RIPPLE_LIMIT) {
      const ripple = new Ripple(x, y, this.color);
      this.ripples.push(ripple);
    }

    const rates = this.ripples.map(ripple => ripple.rate);

    if (!this.playing) {
      this.playing = true;
      this.play();
    }
  }

  play() {
    if (this.ripples.length) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ripples.forEach(ripple => {
        const { x, y, radius, color } = ripple;

        this.context.strokeStyle = color;
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        this.context.stroke();
        ripple.update();
      });

      // call redraw callback if any
      if (this.redrawCb) {
        this.redrawCb(this.context, this.canvas);
      }
      queueNextFrame(this.play.bind(this));
    }
  }
}

export default CanvasRipples;
