import config from 'config'
import path from 'path'

const dir = (arr, isAbsolute = false) => {
  const p = isAbsolute ? path.resolve : path.join
  let res = ''

  arr.forEach((d) => {
    res = p(res, d)
  })

  return res
}

/**
 * 配列をディレクトリパスに変換
 * @param {string[]} arr - ディレクトリの配列
 * @return {string}
 */
export const relativePath = (arr) => dir(arr)

/**
 * 配列をプロジェクトの絶対パスに変換
 * @param {string[]} arr - ディレクトリの配列
 * @return {string}
 */
export const absolutePath = (arr) => dir(arr, true)

/**
 * 配列をルート相対パスに変換
 * @param {string[]} arr - ディレクトリの配列
 * @return {*}
 */
export const rootRelativePath = (arr) => {
  if (arr.length === 0) return config.get('output.root')
  return `${config.get('output.root') + relativePath(arr)}/`
}
