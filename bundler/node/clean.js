/**
 * 出力先ディレクトリ内を削除
 * NODE_ENV指定か引数指定がない場合は`dist_*`のディレクトリ内をすべて削除
 */
import config from 'config'
import rimraf from 'rimraf'
import commandLineArgs from 'command-line-args'
import { COLOR_RESET, DIST, ENV_LIST, YELLOW } from '../const'
import Log from '../modules/Log'
import { readYaml } from '../modules/readYaml'

const task = 'clean'
const target = (() => {
  if (process.env.NODE_ENV) return `${DIST}/*`

  // 引数で直接指定した場合でかつ実行可能な環境変数だった場合はそれをセットする
  const params = commandLineArgs([{ name: 'env', type: String, defaultOption: false }])
  if (params.env != null) {
    for (let i = 0, iLen = ENV_LIST.length; i < iLen; i++) {
      const env = ENV_LIST[i]

      // 指定した引数と実行可能な環境変数であればセットする
      if (env === params.env) {
        const { dist } = readYaml(env, ['config'])
        return `${config.get('output.prefix')}_${dist}/*`
      }
    }

    Log.error(task, `parameter ${YELLOW}'${params.env}'${COLOR_RESET} is not exist for ${YELLOW}'--env ${ENV_LIST.join(' || ')}'${COLOR_RESET}`)
    return null
  }
  // タスク単体実行時かつ引数がない(無効)の場合は指定したプレフィックスで始まる全ディレクトリ内を削除
  return `${config.get(`output.prefix`)}_*/*`
})()

if (target != null) {
  rimraf(target, (error) => {
    if (error) {
      Log.error(task, error)
      return false
    }

    Log.complete(`${task} [${target}]`)
  })
}