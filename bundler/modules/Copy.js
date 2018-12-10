import config from 'config'
import cpx from 'cpx'
import moment from 'moment'
import path from 'path'
import { BLUE, DIST, RED } from '../const'
import Log from './Log'

export default class Copy {
  #task = null
  #input = null
  #output = null
  #source = null
  
  /**
   * コピータスクのセットアップ
   * @param {string} [task = 'copy']
   * @param {string} [input = config.input.files.copy]
   * @param {string} [output = '']
   */
  constructor (task = 'copy', input = config.get('input.files.copy'), output = '') {
    this.#task = task
    this.#input = path.join(config.get('input.root'), input)
    this.#output = path.join(DIST, output)
    this.#source = `${this.#input}/**/[!_]*`
  }

  /**
   * 単体実行
   */
  once () {
    // @see: https://www.npmjs.com/package/cpx
    cpx.copy(this.#source, this.#output, (error) => {
      if (error) {
        Log.error(this.#task, error)
        return false
      }
    })

    Log.complete(this.#task)
  }

  /**
   * コピーファイルの監視
   */
  watch () {
    cpx.watch(this.#source, this.#output)
      .on('copy', (event) => Log.message(`[${moment().format('HH:mm:ss')}] ${event.dstPath} copied !`, BLUE))
      .on('remove', (event) => Log.message(`[${moment().format('HH:mm:ss')}] ${event.path} remove !`, RED))
      .on('watch-error', (error) => Log.error(this.#task, error))
  }
}