import glob from 'glob'
import watch from 'node-watch'
import { WATCH } from '../const'
import { MODE } from './Env'
import FileOperation from './FileOperation'
import { relativePath } from './getPath'
import { readYaml } from './readYaml'

/**
 * Yaml -> JSON
 * @param {string} task - タスク名
 * @param {string} output - 出力先
 * @param {string[]} inputDirArr - ワークスペースディレクトリの配列
 */
export default class MultipleYamlBuild extends FileOperation {
  #input = null
  #inputDirArr = null
  #reg1 = null
  #reg2 = null
  #output = null
  
  constructor (task, output, inputDirArr) {
    super(task, output)

    this.#input = relativePath(inputDirArr)
    this.#inputDirArr = inputDirArr

    this.#reg1 = new RegExp(`${this.#input}/`)
    this.#reg2 = new RegExp('.ya?ml$')

    this.#output = output
  }

  /**
   * 生成済みのJSONを削除
   */
  reset () {
    const reg = new RegExp(`${this.#output}/`)

    glob.sync(`${this.#output}/**/*.json`).forEach((filepath) => {
      const name = filepath.replace(reg, '')
      super.remove(name)
    })
  }

  /**
   * 全てのYAMLを一度実行後モードによって切り替え
   * @param minify
   */
  run (minify) {
    glob.sync(`${this.#input}/**/[!_]*.y?(a)ml`).forEach((filepath) => {
      const { filename, body } = this.#convert(filepath, minify)
      super.add(filename, body)
    })

    if (MODE !== WATCH) return false

    // 監視する場合
    const option = {
      recursive: true,
      filter: (f) => {
        const exclude = f.replace(this.#reg1, '')
        return this.#reg2.test(exclude) && /^(?!_).*$/.test(exclude)
      }
    }

    watch(this.#input, option, (evt, filepath) => {
      if (evt === 'update') {
        const { filename, body } = this.#convert(filepath, minify)
        super.add(filename, body)
      } else if (evt === 'remove') {
        const { filename } = this.#convert(filepath, minify, true)
        super.remove(filename)
      }
    })
  }

  /**
   * YAMLファイルをJSONデータに変換
   * @param {string} filepath
   * @param {boolean} [minify = false]
   * @param {boolean} [isFileOnly = false]
   * @return {{filename: string, body: *}}
   * @private
   */
  #convert = (filepath, minify = false, isFileOnly = false) => {
    const name = filepath.replace(this.#reg1, '').replace(this.#reg2, '')

    const body = (() => {
      if (isFileOnly) return null

      const yaml = readYaml(name, this.#inputDirArr)
      const space = minify ? 0 : 2
      return JSON.stringify(yaml || {}, null, space)
    })()

    return {
      filename: `${name}.json`,
      body
    }
  }
}