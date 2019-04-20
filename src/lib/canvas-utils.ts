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