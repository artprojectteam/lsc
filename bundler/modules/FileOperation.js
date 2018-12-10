import fs from 'fs'
import mkdirp from 'mkdirp'
import path from 'path'
import { BLUE, RED } from '../const'
import Log from './Log'

export default class FileOperation {
  #task = null
  #output = null

  constructor (task, output) {
    this.#task = task
    this.#output = output
  }

  /**
   * 出力先にファイルの作成
   * @param {string} filename - 出力ファイル名
   * @param {*} body - JSON
   */
  add (filename, body) {
    const filepath = path.join(this.#output, filename)

    mkdirp(path.dirname(filepath), (mkErr) => {
      if (mkErr) {
        Log.error(this.#task, mkErr)
        return false
      }

      fs.writeFile(filepath, body, 'utf8', (fsErr) => {
        if (fsErr) {
          Log.error(this.#task, fsErr)
          return false
        }

        Log.message(`convert to ${filepath}`, BLUE)
      })
    })
  }

  /**
   * 出力先のファイル削除
   * @param {string} filename
   * @return {boolean}
   */
  remove (filename) {
    const filepath = path.join(this.#output, filename)
    const isExist = FileOperation.isExist(filepath)

    if (isExist === false) return false

    fs.unlink(filepath, (err) => {
      if (err) {
        Log.error(this.#task, err)
        return false
      }

      Log.message(`remove to ${filepath}`, RED)
    })
  }

  /**
   * ファイルの存在チェック
   * @param {string} file - ファイルパス
   * @return {boolean}
   */
  static isExist (file) {
    try {
      fs.accessSync(file, fs.constants.T_OK)
      return true
    } catch (e) {
      return false
    }
  }
}