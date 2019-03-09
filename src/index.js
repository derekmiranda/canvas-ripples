const WINDOW_WIDTH_TO_INIT_RATE = 0.02
const WINDOW_WIDTH_TO_DECAY_RATE = 0.0003
const WINDOW_WIDTH_TO_MIN_RATE = 0.005

let INIT_SPREAD_RATE = window.innerWidth * WINDOW_WIDTH_TO_INIT_RATE
let DECAY_RATE = window.innerWidth * WINDOW_WIDTH_TO_DECAY_RATE // per frame
let MIN_RATE = window.innerWidth * WINDOW_WIDTH_TO_MIN_RATE

const RIPPLE_LIMIT = Infinity;

const queueNextFrame = requestAnimationFrame;
// const FRAME_RATE = 16;
// const queueNextFrame = fn => setTimeout(fn, FRAME_RATE);

function generateColorVal() {
  return Math.floor(255 * Math.random());
}

function generateColor() {
  const r = generateColorVal();
  const g = generateColorVal();
  const b = generateColorVal();
  return `rgb(${r},${g},${b})`;
}

class Ripple {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 0;
    this.rate = INIT_SPREAD_RATE;
  }

  update() {
    this.radius += this.rate;
    this.rate = Math.max(this.rate - DECAY_RATE, MIN_RATE);
  }
}

class CanvasRipples {
  constructor(color) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext("2d");
    this.ripples = [];
    this.playing = false;
    this.color = color;

    const _touchHandler = this.touchHandler.bind(this)

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
      this.playing = true
      this.play();
    }
  }

  play() {
    if (this.ripples.length) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ripples.forEach(ripple => {
        const {
          x,
          y,
          radius,
          color
        } = ripple;

        this.context.strokeStyle = color;
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        this.context.stroke();
        ripple.update();
      });

      queueNextFrame(this.play.bind(this));
    }
  }
}

(function () {
  window.canvasRipples = new CanvasRipples('grey');

  document.body.appendChild(canvasRipples.canvas);
})();