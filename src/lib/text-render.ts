import { fillTextWithWrapping } from './canvas-text-wrap'

export function renderContentToContext(ctx) : void {
  const contentCollection : NodeListOf<HTMLElement> = document.querySelectorAll('.content')

  for (let i = 0; i < contentCollection.length; i += 1) {
    const el : HTMLElement = contentCollection[i]
    const text : string = el.innerText
    const rect : ClientRect = el.getBoundingClientRect()
    const lineHeight : number = parseInt(getComputedStyle(el).lineHeight)

    // hide text
    el.style.color = 'rgba(0, 0, 0, 0)'

    fillTextWithWrapping({
      text,
      ctx,
      x: rect.left,
      y: rect.top + lineHeight,
      width: rect.width,
      height: rect.height,
      lineHeight
    })
  }
}
