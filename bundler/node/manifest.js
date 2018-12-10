/**
 * manifest.jsonの作成
 */
import config from 'config'
import { DIST, WATCH } from '../const'
import { MODE } from '../modules/Env'
import { readYaml } from '../modules/readYaml'
import SingleYamlBuild from '../modules/SingleYamlBuild'

const site = readYaml('site')
const style = readYaml('base', [config.get('input.root'), config.get('input.files.stylus'), '_assets', 'data'])

/**
 * データの追加
 * @param {object} data
 * @return {*}
 */
const update = (data) => {
  /**
   * キーの存在もしくは空のチェック
   * @param {string} key
   * @param {object} obj
   * @return {boolean}
   */
  const notExistKey = (key, obj) => (key in obj) === false || obj[key] === ''

  if (notExistKey('name', data)) data['name'] = site['title']
  if (notExistKey('short_name', data)) data['short_name'] = site['title']
  if (notExistKey('theme_color', data)) data['theme_color'] = style['main']

  data['scope'] = config.get('output.root')

  return data
}

const m = new SingleYamlBuild('manifest', DIST, [config.get('input.root')])

if (MODE === WATCH) {
  m.watch(update)
} else {
  m.once(update)
}
