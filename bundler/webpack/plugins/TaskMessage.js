import Log from '../../modules/Log'

/**
 * webpack用タスクメッセージ
 */
export default class TaskMessage {
  /**
   * @param {string} task
   */
  constructor (task) {
    this._task = task
  }

  /**
   * Event Emitter
   * @param compiler
   */
  apply (compiler) {
    compiler.hooks.compile.tap('Message', (params) => {
      Log.start(this._task)
    })

    // コンパイル終了
    compiler.hooks.afterEmit.tap('Message', (compilation) => {
      console.log("")
      Log.complete(this._task)
    })
  }
}