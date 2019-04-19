import {WrappedTextRenderer} from './canvas-text-wrap'

const _contentRendererMap = new Map()
export function renderContentToContext(ctx) : void {
  const contentCollection: NodeListOf<HTMLElement> = document.querySelectorAll('.content')
  for (let i = 0; i < contentCollection.length; i += 1) {
    const el : HTMLElement = contentCollection[i]
    const text : string = el.innerText
    const rect : ClientRect = el.getBoundingClientRect()
    const lineHeight : number = parseInt(getComputedStyle(el).lineHeight)

    let textRenderer = _contentRendererMap.get(el)
    if (!textRenderer) {
      textRenderer = new WrappedTextRenderer({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
        mainCtx: ctx,
        font: ctx.font
      })
      _contentRendererMap.set(el, textRenderer)
    }
    
    textRenderer.render(text)
    // hide text
    el.style.color = 'rgba(0, 0, 0, 0)'

    /* TODO:
    - draw wrapped text on separate canvases
    - draw image data to main canvas text
    */
  }
}
