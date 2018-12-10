/**
 * YAMLで作ったStylusの定義データをJSONに変換する
 */
import config from 'config'
import { relativePath } from '../modules/getPath'
import MultipleYamlBuild from '../modules/MultipleYamlBuild'

const stylusDir = [config.get('input.root'), config.get('input.files.stylus'), '_assets']
const outputPath = relativePath([...stylusDir, 'const'])
const operation = new MultipleYamlBuild('stylusConst', outputPath, [...stylusDir, 'data'])

operation.reset() // 一度生成済みJSONを削除
operation.run(false)