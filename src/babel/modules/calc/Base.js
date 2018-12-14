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
    return this.#category.findIndex((elem) => elem === str)
  }

  /**
   * multiplication
   * @param {number} base
   * @return {number}
   */
  product (base) {
    return this.#digitRound(this.#number * base)
  }

  /**
   * division
   * @param {number} base
   * @return {number}
   */
  quotient (base) {
    return this.#digitRound(this.#number / base)
  }

  #digitRound = (number) => {
    const pow = 10 ** 5
    return Math.round(number * pow) / pow
  }
}