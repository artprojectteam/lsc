export default class Fuzzy {
  /**
   * 右肩上がりの傾斜型メンバーシップ
   * @param {number} value
   * @param {number} x0
   * @param {number} x1
   * @return {number}
   * @constructor
   */
  static Grade (value, x0, x1) {
    if (value <= x0) return 0
    if (value >= x1) return 1

    const diff = x1 - x0
    return (value / diff) - (x0 / diff)
  }

  /**
   * 右肩下がりの逆傾斜型メンバーシップ
   * @param value {number}
   * @param x0 {number}
   * @param x1 {number}
   * @return {number}
   * @constructor
   */
  static ReverseGrade (value, x0, x1) {
    if (value <= x0) return 1
    if (value >= x1) return 0

    const diff = x1 - x0
    return (x1 / diff) - (value / diff)
  }

  /**
   * 三角形型メンバーシップ
   * @param value {number}
   * @param x0 {number} - 右肩上がり方向の起点
   * @param x1 {number} - 頂点(右肩上がり方向の終点/右肩下がり方向の起点)
   * @param x2 {number} - 右肩下がり方向の終点
   * @return {number}
   * @constructor
   */
  static Triangle (value, x0, x1, x2) {
    if (value <= x0 || value >= x2) return 0
    if (value === x1) return 1
    if (value > x0 && value < x1) return Fuzzy.Grade(value, x0, x1)
    return Fuzzy.ReverseGrade(value, x1, x2)
  }
}