import config from 'config'
import watch from 'node-watch'
import FileOperation from './FileOperation'
import { relativePath } from './getPath'
import { readYaml } from './readYaml'

/**
 * 1つのyamlファイルを追加・削除
 * @param {string} task - タスク名 & ファイル名
 * @param {string} output - 出力先
 * @param {string[]} dir - 入力元の配列
 */
export default class SingleYamlBuild extends FileOperation {
  #space = 2
  #name = null
  #yaml = null
  #json = null
  #input = null
  #isExist = false

  constructor (task, output, dir) {
    super(task, output)

    this.#space = config.get('options.minify') ? 0 : 2
    this.#name = task
    this.#yaml = `${task}.yml`
    this.#json = `${task}.json`
    this.#input = dir

    const file = relativePath([...this.#input, this.#yaml])
    this.#isExist = FileOperation.isExist(file)
  }

  /**
   * 1回のみ
   * @param {Function} [cb = null]
   * @return {boolean}
   */
  once (cb = null) {
    if (this.#isExist === false) {
      // 出力先にファイルが存在していたら削除する
      super.remove(this.#json)
      return false
    }

    this.#create(cb)
  }

  /**
   * ファイル監視
   * @param {Function} [cb = null]
   */
  watch (cb = null) {
    this.once(cb)
    if (this.#isExist) return false

    const input = relativePath(this.#input)
    const rep = new RegExp(`${this.#input}/`)
    const reg = new RegExp(`^${this.#name}.ya?ml$`)

    const option = {
      recursive: false,
      filter: (f) => {
        const file = f.replace(rep, '')
        return reg.test(file)
      }
    }

    watch(input, option, (evt, filepath) => {
      if (evt === 'update') {
        this.#create(cb)
      } else if (evt === 'remove') {
        super.remove(this.#json)
      }
    })
  }


  /**
   * データの生成
   * @param {Function} cb - 追加の処理
   */
  #create = (cb) => {
    const _d = readYaml(this.#name, this.#input)
    const data = cb ? cb(_d) : _d

    super.add(this.#json, JSON.stringify(data || {}, null, this.#space))
  }
}