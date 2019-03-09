const WINDOW_WIDTH_TO_INIT_RATE = 0.02;
const WINDOW_WIDTH_TO_DECAY_RATE = 0.0003;
const WINDOW_WIDTH_TO_MIN_RATE = 0.005;

let INIT_SPREAD_RATE = window.innerWidth * WINDOW_WIDTH_TO_INIT_RATE;
let DECAY_RATE = window.innerWidth * WINDOW_WIDTH_TO_DECAY_RATE; // per frame
let MIN_RATE = window.innerWidth * WINDOW_WIDTH_TO_MIN_RATE;

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

export default Ripple;
