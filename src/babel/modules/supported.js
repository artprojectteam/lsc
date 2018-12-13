export const $wheel = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll'

export const isTouch = typeof document.ontouchstart !== 'undefined'
export const isPointer = window.navigator.pointerEnabled

export const $pointer = {
  start: isPointer ? 'pointerdown' : isTouch ? 'touchstart' : 'mousedown',
  move: isPointer ? 'pointermove' : isTouch ? 'touchmove' : 'mousemove',
  end: isPointer ? 'pointerup' : isTouch ? 'touchend' : 'mouseup'
}
