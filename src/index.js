const FRAME_RATE = 16;
const INIT_SPREAD_RATE = 10;
const DECAY_RATE = 0.1; // per second
const RIPPLE_LIMIT = Infinity;
const RIPPLE_COLOR = "magenta";

// const renderFrame = requestAnimationFrame;
const renderFrame = fn => setTimeout(fn, FRAME_RATE);

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
    this.radius = INIT_SPREAD_RATE;
    this.color = color;
    // this.radius = 0;
  }

  update() {
    this.radius += INIT_SPREAD_RATE;
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
        const ripple = new Ripple(x, y, generateColor());
        this.ripples.push(ripple);
      }

      this.play();
    });
  }

  play() {
    this.ripples.forEach(ripple => {
      const { x, y, radius, color } = ripple;
      this.context.strokeStyle = color;
      this.context.beginPath();
      this.context.arc(x, y, radius, 0, 2 * Math.PI);
      this.context.stroke();
      ripple.update();
    });
    // renderFrame(this.play.bind(this));
  }
}

(function() {
  window.canvasRipples = new CanvasRipples();

  document.body.appendChild(canvasRipples.canvas);
})();
