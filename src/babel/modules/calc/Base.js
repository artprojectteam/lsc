import Util from '../Util'

export default class Base {
  #category = null
  #number = 0

  constructor (category) {
    this.#category = category
  }

  /**
   * Input numbers
   * @param {string} number
   */
  input (number) {
    this.#number = number
  }

  /**
   * Get array subscript
   * @param {string} str
   * @return {*}
   */
  index (str) {
    return Util.arrIndex(this.#category, str)
  }

  /**
   * multiplication
   * @param {number} base
   * @return {number}
   */
  product (base) {
    return Util.digitRound(this.#number * base)
  }

  /**
   * division
   * @param {number} base
   * @return {number}
   */
  quotient (base) {
    return Util.digitRound(this.#number / base)
  }
}