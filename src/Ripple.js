const WINDOW_WIDTH_TO_INIT_RATE = 0.019;
const WINDOW_WIDTH_TO_DECAY_RATE = 0.0003;
const WINDOW_WIDTH_TO_MIN_RATE = 0.007;
const EDGE_MODIFIER = 1.5

let INIT_SPREAD_RATE = window.innerWidth * WINDOW_WIDTH_TO_INIT_RATE;
let DECAY_RATE = window.innerWidth * WINDOW_WIDTH_TO_DECAY_RATE; // per frame
let MIN_RATE = window.innerWidth * WINDOW_WIDTH_TO_MIN_RATE;

// make ripples starting closer to edge move faster
// ripples starting in center area (rectangular center section)
// will have no modifier (i.e. 1)
// 
// centerThreshold - defines % of area that center section takes up
// of whole window. Accepts number values from [0, 1]
function getEdgeModifier(x, y, w, h, centerThreshold) {
  // define center bounds
  const lowThreshold = (1 - centerThreshold) / 2
  const highThreshold = 1 - lowThreshold

  const leftBound = lowThreshold * w
  const rightBound = highThreshold * w
  const upperBound = lowThreshold * h
  const lowerBound = highThreshold * h

  // if (x, y) point outside of center area,
  // boost ripple speed
  const outsideOfCenter = (
    (x < leftBound || x > rightBound) ||
    (y < upperBound || y > lowerBound)
  )

  if (outsideOfCenter) {
    return EDGE_MODIFIER
  }
  return 1
}

class Ripple {
  constructor({
    x,
    y,
    color,
    initRate = INIT_SPREAD_RATE,
    decayRate = DECAY_RATE,
    minRate = MIN_RATE
  }) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 0;

    const edgeModifier = getEdgeModifier(x, y, window.innerWidth, window.innerHeight, 0.6)
    this.rate = initRate * edgeModifier;
    this.decayRate = decayRate
    this.minRate = minRate * edgeModifier
  }

  update() {
    this.radius += this.rate;
    this.rate = Math.max(this.rate - this.decayRate, this.minRate);
  }
}

export default Ripple;