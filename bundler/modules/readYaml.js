import fs from 'fs'
import yaml from 'js-yaml'
import path from 'path'
import { relativePath } from './getPath'

/**
 * YAMLファイルをオブジェクトにして返却
 * @param {string} name - YAMLファイル名
 * @param {string[]} [dir = ['bundler', 'const']] - ディレクトリの配列
 * @return {object}
 */
export const readYaml = (name, dir = ['bundler', 'const']) => {
  const p = relativePath(dir)
  return yaml.safeLoad(fs.readFileSync(path.join(p, `${name}.yml`), 'utf8'))
}