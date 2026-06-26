export function createModelViewerElement(src: string): HTMLDivElement {
  const wrapper = document.createElement("div")
  wrapper.style.width = "100%"
  wrapper.style.height = "100%"

  const el = document.createElement("model-viewer")
  el.setAttribute("src", src)
  el.setAttribute("auto-rotate", "")
  el.setAttribute("camera-controls", "")
  el.setAttribute("ar", "")
  el.setAttribute("shadow-intensity", "1")
  el.style.width = "100%"
  el.style.height = "100%"

  wrapper.appendChild(el)
  return wrapper
}
