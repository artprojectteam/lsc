export default class Util {
  /**
   * 配列の添字を取得
   * @param {string[]} category
   * @param {string} str
   * @return {number}
   */
  static arrIndex (category, str) {
    return category.findIndex((elem) => elem === str)
  }

  /**
   * 小数点以下を任意の桁数で丸める
   * @param {number} number
   * @param {number} digit
   * @return {number}
   */
  static digitRound (number, digit = 5) {
    const pow = Math.pow(10, digit)
    return Math.round(number * pow) / pow
  }
}