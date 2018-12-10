import config from 'config'
import { absolutePath } from '../../modules/getPath'
import { readYaml } from '../../modules/readYaml'

const inputPath = absolutePath([config.get('input.root'), config.get('input.files.pug')])

/**
 * pug/_assets/data 配下のyamlファイルを読み込む
 * @param {string} filename
 * @param {string[]} [dir=[]]
 * @return {Object}
 */
export const getData = (filename, dir = []) => readYaml(filename, [inputPath, '_assets', 'data', ...dir])

/**
 * サイト全体のデータ
 * @return {*}
 */
export const getSiteData = () => {
  const { color } = readYaml('base', [config.get('input.root'), config.get('input.files.stylus'), '_assets', 'data'])
  const { title, separate, author, authorUrl, description, url } = readYaml('site')

  return {
    title,
    separate,
    author,
    authorUrl,
    description,
    url: url + config.get('output.root'),
    color
  }
}

/**
 * 各ページの設定データを取得(_assets/data/page 配下)
 * @param {string} filename
 * @param {string[]} [dir=[]]
 * @return {Object}
 */
export const getPageData = (filename, dir = []) => getData(filename, ['page', ...dir])

/**
 * headのogp設定
 * @param {object} ogp
 * @return {string|null}
 */
export const getOgpPrefix = (ogp) => {
  if (ogp == null) return null

  // 各ページにOGPを設定していない場合は全体設定を利用する
  const _o = getData('ogp')

  const type = ogp['type'] || _o['type']

  const fb = ogp['fb']['visible']
  const tw = ogp['tw']['visible']

  if ((!fb && !tw) || type === '' || type == null) return null

  const prefix = [
    'og: http://ogp.me/ns#',
    `${type}: http://ogp.me/ns/${type}#`
  ]

  if (fb) prefix.push('fb: http://ogp.me/ns/fb#')

  return prefix.join(' ')
}

/**
 * ルート相対パスか相対パスでルートを取得
 * @param {string} relative
 * @return {string}
 */
export const getRoot = (relative) => relative !== '' ? `${relative}/` : config.get('output.root')

/**
 * 各ディレクトリパス
 * @param {string} root
 * @return {object}
 */
export const getDir = (root) => {
  const output = config.get('output.files')
  const { url, target } = config.get('cdn')
  const isCdn = url !== ''
  const dir = {}

  Object.entries(output).forEach(([k, v]) => {
    if (isCdn && target.some((tgt) => tgt === k)) {
      dir[k] = [url, ...v].join('/')
    } else {
      dir[k] = root + v.join('/')
    }
  })

  return dir
}