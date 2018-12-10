/**
 * YAMLをJSONに変換
 */
import config from 'config'
import { DIST } from '../const'
import { relativePath } from '../modules/getPath'
import MultipleYamlBuild from '../modules/MultipleYamlBuild'

const outputPath = relativePath([DIST, ...config.get('output.files.data')])
const operation = new MultipleYamlBuild('yaml2json', outputPath, [config.get('input.root'), config.get('input.files.yaml2json')])

operation.run(config.get('options.minify'))