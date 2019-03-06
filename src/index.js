const FRAME_RATE = 16;
const INIT_SPREAD_RATE = 2;
const DECAY_RATE = 0.01; // per frame
const MIN_RATE = 1;
const RIPPLE_LIMIT = Infinity;
const RIPPLE_COLOR = "gray";

// const queueNextFrame = requestAnimationFrame;
const queueNextFrame = fn => setTimeout(fn, FRAME_RATE);

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
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext("2d");
    this.ripples = [];

    this.canvas.addEventListener("click", event => {
      const x = event.clientX;
      const y = event.clientY;

      if (this.ripples.length < RIPPLE_LIMIT) {
        const ripple = new Ripple(x, y, RIPPLE_COLOR);
        this.ripples.push(ripple);
      }

      const rates = this.ripples.map(ripple => ripple.rate);
      console.log("rates", rates);

      this.play();
    });
  }

  play() {
    if (this.ripples.length && this.ripples.some(ripple => ripple.radius)) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.ripples.forEach(ripple => {
      const { x, y, radius, color } = ripple;
      this.context.strokeStyle = color;
      this.context.beginPath();
      this.context.arc(x, y, radius, 0, 2 * Math.PI);
      this.context.stroke();
      ripple.update();
    });

    queueNextFrame(this.play.bind(this));
  }
}

(function() {
  window.canvasRipples = new CanvasRipples();

  document.body.appendChild(canvasRipples.canvas);
})();
