import Fuzzy from './Fuzzy'
import { $pointer, $wheel } from './supported'

export default class Scroll {
  #container = {
    elem: null,
    h: 0
  }

  #box = {
    elem: null,
    h: 0,
    list: []
  }

  #center = 0
  #lastPos = 0
  #selectCenter = 0

  #pos = 0
  #w = -1
  #padding = 0

  // current element
  #index = 0

  #isScroll = false

  // event
  #ev = {
    start: null,
    move: null,
    end: null,
    wheel: null
  }

  #cb = null

  constructor (cb = null) {
    this.#w = document.documentElement.clientWidth || document.body.clientWidth
    this.#cb = cb
  }

  currentIndex () {
    return this.#index
  }

  activate () {
    if (this.#isScroll === false) return false

    this.#swipe()
    this.#wheel()
  }

  deactivate () {
    if (this.#isScroll === false) return false

    this.#isScroll = false
    const elem = this.#container.elem

    elem.removeEventListener($pointer.start, this.#ev.start, false)
    elem.removeEventListener($pointer.move, this.#ev.move, { passive: false })
    elem.removeEventListener($pointer.end, this.#ev.end, false)
    elem.removeEventListener($wheel, this.#ev.wheel, { passive: false })
  }

  /**
   * view rendering, resize
   * @param {HTMLElement} container
   * @param {HTMLElement} box
   * @param {HTMLElement} select
   * @param {boolean} isResize
   * @return {boolean}
   */
  update (container, box, select, isResize = false) {
    if (isResize) {
      const w = document.documentElement.clientWidth || document.body.clientWidth
      if (this.#w === w) return false

      this.#w = w
    }

    this.#container.elem = container
    this.#box.elem = box
    this.#setup(select.clientHeight)
  }

  /**
   * element initialize
   * @param {number} selectH
   */
  #setup = (selectH) => {
    this.#container.h = this.#container.elem.offsetHeight
    this.#box.list = []
    this.#pos = 0

    // 位置のリセット
    const box = this.#box.elem
    box.removeAttribute('style')

    const offset = window.pageYOffset
    const parentOffset = offset + this.#container.elem.getBoundingClientRect().top
    const borderTop = this.#elemStyle(this.#container.elem, 'borderTop', true)
    let h = 0

    for (let i = 0, iLen = box.children.length; i < iLen; i++) {
      const elem = box.children[i]

      // 親要素からみたY座標値 + 高さの中心
      const y = (offset + elem.getBoundingClientRect().top) - parentOffset - borderTop
      this.#box.list.push(y)

      h += elem.offsetHeight
    }

    const pt = this.#elemStyle(box, 'paddingTop', true)
    const pb = this.#elemStyle(box, 'paddingBottom', true)

    this.#padding = pt
    this.#box.h = h + pt + pb

    this.#isScroll = this.#box.h > this.#container.h

    this.#lastPos = this.#container.h - this.#box.h
    this.#center = Math.floor(this.#container.h / 2)
    this.#selectCenter = Math.floor(selectH / 2)
  }

  /**
   * event setup
   */
  #swipe = () => {
    const elem = this.#container.elem

    // 一時的なデータ
    let startY = null
    let startTime = null
    let movePos = null
    let endTime = null

    /* start event */
    const start = (e) => {
      startY = e.touches ? e.touches[0].pageY : e.pageY
      startTime = e.timeStamp

      // initialize
      movePos = null
      endTime = null
    }
    this.#ev.start = start.bind(this)
    elem.addEventListener($pointer.start, this.#ev.start, false)

    /* move event */
    const move = (e) => {
      if (startY == null) return false

      e.preventDefault()

      const pageY = e.touches ? e.touches[0].pageY : e.pageY
      movePos = Math.floor(pageY - startY - Math.abs(this.#pos))
      this.#animation(movePos, 0)

      endTime = e.timeStamp
    }
    this.#ev.move = move.bind(this)
    elem.addEventListener($pointer.move, this.#ev.move, { passive: false })

    /* end event */
    const end = () => {
      if (movePos == null) return false

      let pos = 0
      const diffH = this.#box.h - Math.abs(movePos)

      if (movePos > 0) {
        pos = 0
      } else if (diffH < this.#container.h) {
        pos = this.#lastPos
      } else {
        const diffTime = endTime - startTime
        const vertical = movePos - this.#pos

        // 慣性
        const reverb = Math.floor(Math.abs(vertical) / diffTime * 100)

        if (vertical > 0) {
          // down
          pos = movePos + reverb
          if (pos > 0) pos = 0
        } else {
          // up
          pos = movePos - reverb
          if (pos < this.#lastPos) pos = this.#lastPos
        }
      }

      this.#index = this.#searchIndex(pos)
      this.#cb(this.#index)

      pos = -(this.#box.list[this.#index] - this.#padding)
      this.#animation(pos, 0.4)
      this.#pos = pos

      // initialize
      startY = null
      movePos = null
    }
    this.#ev.end = end.bind(this)
    elem.addEventListener($pointer.end, this.#ev.end, false)
  }

  /**
   * event setup
   */
  #wheel = () => {
    let timer = null

    const wheel = (e) => {
      e.preventDefault()
      clearTimeout(timer)

      // ブラウザによってホイールした量の情報の在り処が違う
      const delta = e.deltaY ? -(e.deltaY) : e.wheelDelta || -(e.detail)

      // そのままホイール量を付与すると一気に進んでしまうので、付与するホイール量を抑える
      let pos = Math.floor(this.#pos + (delta / 3))

      if (pos > 0) {
        pos = 0
      } else if (pos < this.#lastPos) {
        pos = this.#lastPos
      }

      this.#animation(pos, 0)
      this.#pos = pos

      timer = setTimeout(() => {
        this.#index = this.#searchIndex(pos)
        this.#cb(this.#index)

        pos = -(this.#box.list[this.#index] - this.#padding)
        this.#animation(pos, 0.4)
        this.#pos = pos
      }, 100)
    }

    this.#ev.wheel = wheel.bind(this)
    this.#container.elem.addEventListener($wheel, this.#ev.wheel, { passive: false })
  }

  /**
   * get css information
   * @param {HTMLElement} elem
   * @param {string} style - css property
   * @param {boolean} number - return is int or default
   * @return {*}
   */
  #elemStyle = (elem, style, number = false) => {
    const res = document.defaultView.getComputedStyle(elem)[style]

    // TODO: ％の時どうするか
    if (number) {
      return parseInt(res, 10)
    } else {
      return res
    }
  }

  /**
   * css animation
   * @param {number} pos
   * @param {number} duration
   */
  #animation = (pos, duration) => {
    const ops = `${duration}s ease`
    const transform = `translate3d(0, ${pos}px, 0)`
    const box = this.#box.elem

    box.style['-webkit-transform'] = transform
    box.style['transform'] = transform
    box.style['-webkit-transition'] = `-webkit-transform ${ops}`
    box.style['transition'] = `transform ${ops}`
  }

  /**
   * get integer for near list
   * @param {number} pos
   * @return {number}
   */
  #searchIndex = (pos) => {
    let old = -1

    for (let i = 0, iLen = this.#box.list.length; i < iLen; i++) {
      // 一番近いリストを取得
      const p = (this.#box.list[i] + this.#selectCenter) + pos
      const t = Fuzzy.Triangle(p, 0, this.#center, this.#container.h)

      if (t === 1) return i
      if (old > t) return i - 1

      old = t
    }

    return this.#box.list.length - 1
  }
}