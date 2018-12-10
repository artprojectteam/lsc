import config from 'config'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import webpack from 'webpack'
import { DIST } from '../../const'
import { FileList } from '../../modules/FileList'
import { absolutePath } from '../../modules/getPath'
import { babel_optimization, babel_settings, webpack_progress, webpack_provide } from '../modules/commonSettings'
import { babelLoader, esLintLoader, fileLoader, workerLoader, yamlLoader } from '../modules/loaders'
import { minifyPlugin } from '../modules/plugins'
import TaskMessage from '../plugins/TaskMessage'

//*********** loader ***************//
const loaders = [esLintLoader, workerLoader, babelLoader, yamlLoader]

// file-loaderを利用する場合
if (config.get('options.useFileLoader.babel')) {
  loaders.push(fileLoader(config.get('output.files.js'), config.get('output.files.img'), config.get('options.imageHash.babel')))
}

//*********** plugins ***************//
const plugins = [
  // new webpack.DefinePlugin(),    // グローバル定数
  new TaskMessage('babel'),
  new ProgressBarPlugin(webpack_progress('babel'))
]

// 自動読み込みが存在する場合
if (webpack_provide) {
  plugins.push(new webpack.ProvidePlugin(webpack_provide))
}

if (config.get('options.minify')) {
  plugins.push(minifyPlugin)
}

//*********** webpack run ***************//
const inputPath = absolutePath([config.get('input.root'), config.get('input.files.babel')])

export const babel = {
  mode: 'none',
  context: inputPath,
  entry: () => new Promise((resolve) => {
    const files = FileList(inputPath, 'js', true)
    resolve(files)
  }),
  output: {
    path: absolutePath([DIST, ...config.get('output.files.js')]),
    filename: '[name].js'
  },
  optimization: babel_optimization,
  resolve: {
    // node_modules以外のパス解決が必要であれば追記
  },
  module: {
    rules: loaders
  },
  plugins,
  ...babel_settings
}