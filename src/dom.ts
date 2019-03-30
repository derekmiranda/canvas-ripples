export function coverOnLinkClick() {
  const links = document.querySelectorAll('.nav__link')
  const linkRects = Array.prototype.map.call(links, link => link.getBoundingClientRect())
}

export function fitCanvas(canvas: HTMLCanvasElement) : HTMLCanvasElement {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  return canvas
}