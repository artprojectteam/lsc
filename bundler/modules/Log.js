import moment from 'moment'
import { NotificationCenter } from 'node-notifier'
import { BLUE, COLOR_RESET, GREEN, RED } from '../const'

const _template = (task, str) => {
  const separate = '=========='
  return `${separate} [${moment().format('HH:mm:ss')}] ${task} ${str} ${separate}`
}

export default class Log {
  /**
   * 汎用ログ
   * @param {string} message
   * @param {string} [color=''] - console用のカラーコード
   */
  static message (message, color = '') {
    console.log(color + message + COLOR_RESET)
  }

  /**
   * タスク開始ログ
   * @param {string} task
   */
  static start (task) {
    Log.message(_template(task, 'start'), GREEN)
  }

  /**
   * タスク完了ログ
   * @param {string} task
   */
  static complete (task) {
    Log.message(_template(task, 'completed :)'), BLUE)
  }

  /**
   * エラーログ
   * @param {string} task
   * @param {string} error
   * @param {boolean} isNotify
   */
  static error (task, error, isNotify = true) {
    Log.message(_template(task, 'error X('), RED)
    console.error(error)

    if (!isNotify) return false

    const notifier = new NotificationCenter()
    notifier.notify({
      message: error,
      title: `${task} error !`,
      sound: 'Glass'
    })
  }
}