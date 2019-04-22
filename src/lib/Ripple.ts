const WINDOW_WIDTH_TO_INIT_RATE = 0.019;
const WINDOW_WIDTH_TO_DECAY_RATE = 0.0003;
const WINDOW_WIDTH_TO_MIN_RATE = 0.007;
const EDGE_MODIFIER = 1.5;

// make ripples starting closer to edge move faster
// ripples starting in center area (rectangular center section)
// will have no modifier (i.e. 1)
//
// centerThreshold - defines % of area that center section takes up
// of whole window. Accepts number values from [0, 1]
function getEdgeModifier(x, y, w, h, centerThreshold) {
  // define center bounds
  const lowThreshold = (1 - centerThreshold) / 2;
  const highThreshold = 1 - lowThreshold;

  const leftBound = lowThreshold * w;
  const rightBound = highThreshold * w;
  const upperBound = lowThreshold * h;
  const lowerBound = highThreshold * h;

  // if (x, y) point outside of center area,
  // boost ripple speed
  const outsideOfCenter =
    x < leftBound || x > rightBound || (y < upperBound || y > lowerBound);

  if (outsideOfCenter) {
    return EDGE_MODIFIER;
  }
  return 1;
}

class Ripple {
  public x: number;
  public y: number;
  public color: string;
  public radiusToCanvasWidth: number;
  public rate: number;
  public decayRate: number;
  public minRate: number;

  constructor({
    x,
    y,
    color,
    initRate = WINDOW_WIDTH_TO_INIT_RATE,
    decayRate = WINDOW_WIDTH_TO_DECAY_RATE,
    minRate = WINDOW_WIDTH_TO_MIN_RATE
  }) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radiusToCanvasWidth = 0;

    this.rate = initRate;
    this.decayRate = decayRate;
    this.minRate = minRate;
  }

  update() {
    this.radiusToCanvasWidth += this.rate;
    this.rate = Math.max(this.rate - this.decayRate, this.minRate);
  }
}

export default Ripple;
