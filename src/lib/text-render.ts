import { WrappedTextRenderer } from "./canvas-text-wrap";

const _contentRendererMap = new Map();
let _contentCollection: NodeListOf<HTMLElement> | undefined;

export function initContentTextRendering(
  ctx,
  ctxFill,
  contentElSelector = ".content"
): void {
  ctx.fillStyle = ctxFill;
  _contentCollection = document.querySelectorAll(contentElSelector);
  for (let i = 0; i < _contentCollection.length; i += 1) {
    const el: HTMLElement = _contentCollection[i];
    const rect: ClientRect = el.getBoundingClientRect();
    const elStyle: CSSStyleDeclaration = getComputedStyle(el);
    const fontSize: number = parseInt(elStyle.fontSize);
    const fontFam: string = elStyle.fontFamily;
    const font = `${fontSize}px ${fontFam}`;
    const textRenderer = new WrappedTextRenderer({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
      mainCtx: ctx,
      font
    });
    _contentRendererMap.set(el, textRenderer);

    // hide text
    el.style.color = "rgba(0, 0, 0, 0)";
  }
}

export function renderContentToContext(): void {
  for (let i = 0; i < _contentCollection.length; i += 1) {
    const el: HTMLElement = _contentCollection[i];
    const text: string = el.innerText;

    const textRenderer = _contentRendererMap.get(el);
    textRenderer.render(text);

    /* TODO:
    - draw wrapped text on separate canvases
    - draw image data to main canvas text
    */
  }
}
