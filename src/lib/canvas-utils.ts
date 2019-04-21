export function getHighestPointInCanvas(ctx : CanvasRenderingContext2D) : number {
  const { width, height } = ctx.canvas
  const { data } : ImageData = ctx.getImageData(0, 0, width, height)
  // reading alpha value only
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] > 0) {
      return ~~(i / (width * 4))
    }
  }
  return height - 1
}

function distBwTwoPoints(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
}

// ripple is finished whenever radius equals the longest line
// b/w the ripple origin and either of the canvas' four corners
export function rippleFinished(ripple: Ripple, canvasWidth, canvasHeight) {
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