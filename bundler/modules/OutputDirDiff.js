import { relativePath } from './getPath'

/**
 * 2つのディレクトリ階層の差異
 */
export default class OutputDirDiff {
  #base = null
  #target = null
  #depth = null
  
  /**
   * @param {string[]} base - 基本となるディレクトリ
   * @param {string[]} target - 比較したいディレクトリ
   */
  constructor (base, target) {
    this.#base = base
    this.#target = target
    this.#depth = this.#matchDepth()
  }

  /**
   * 基本となるディレクトリから見た比較ディレクトリの相対パス
   * @return {string}
   */
  targetRelativePath () {
    let depth = this.#base.length - this.#depth
    let dir = ''

    while (depth > 0) {
      dir += '../'
      depth--
    }

    dir += relativePath(this.#target.slice(this.#depth))
    return dir
  }

  /**
   * 基本ディレクトリと一致する階層の深さ
   * @return {number} - 改装の深さレベル
   * @private
   */
  #matchDepth = () => {
    let count = 0

    for (let i = 0, iLen = this.#base.length; i < iLen; i++) {
      if (this.#base[i] !== this.#target[i]) break
      count++
    }

    return count
  }
}