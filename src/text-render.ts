export function renderContentToContext(ctx) : void {
  const contentCollection : NodeListOf<HTMLElement> = document.querySelectorAll('.content')

  for (let i = 0; i < contentCollection.length; i += 1) {
    const el : HTMLElement = contentCollection[i]
    const txt : string = el.innerText
    const rect : ClientRect = el.getBoundingClientRect()
    const lineHt : number = parseInt(getComputedStyle(el).lineHeight)

    // hide text
    el.style.color = 'rgba(0, 0, 0, 0)'

    ctx.fillText(txt, rect.left, rect.top + lineHt)
  }
}