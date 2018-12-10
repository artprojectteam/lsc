import config from 'config'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import Safe from 'postcss-safe-parser'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import { DIST } from '../../const'
import { NODE_ENV } from '../../modules/Env'
import { FileList } from '../../modules/FileList'
import { absolutePath } from '../../modules/getPath'
import { webpack_progress, webpack_settings } from '../modules/commonSettings'
import { fileLoader, postCssLoader, stylusLoader } from '../modules/loaders'
import TaskMessage from '../plugins/TaskMessage'

//*********** loader ***************//
const cssLoader = {
  loader: 'css-loader',
  options: {
    url: config.get('options.useFileLoader.stylus'),  // trueだとurl()の処理をfile-loaderで行う
    sourceMap: false,
    'import': true
  }
}

const resolveUrlLoader = {
  loader: 'resolve-url-loader',
  options: {
    sourceMap: false,
    keepQuery: true
  }
}

const outputPath = absolutePath([DIST, ...config.get('output.files.css')])

const extract = {
  test: /\.styl$/,
  exclude: /node_modules/,
  use: ExtractTextPlugin.extract({
    fallback: {
      loader: 'style-loader',
      options: { sourceMap: false }
    },
    publicPath: outputPath,
    use: [cssLoader, resolveUrlLoader, postCssLoader, stylusLoader]
  })
}

const plugins = [
  new TaskMessage('stylus'),
  new ExtractTextPlugin({
    filename: '[name].css',
    disable: false,
    allChunks: true
  }),
  new ProgressBarPlugin(webpack_progress('stylus'))
]

if (config.get('options.minify')) {
  plugins.push(new OptimizeCssAssetsPlugin({
    cssProcessorOptions: {
      parser: Safe,
      discardComments: { removeAll: true }
    }
  }))
}

//*********** webpack run ***************//
const inputPath = absolutePath([config.get('input.root'), config.get('input.files.stylus')])

export const stylus = {
  mode: NODE_ENV,
  context: inputPath,
  entry: () => new Promise((resolve) => {
    const files = FileList(inputPath, 'styl')
    resolve(files)
  }),
  output: {
    path: outputPath,
    filename: '[name].css'
  },
  resolve: {
    // node_modules以外のパス解決
  },
  module: {
    rules: [
      extract,
      fileLoader(config.get('output.files.css'), config.get('output.files.img'), config.get('options.imageHash.stylus'))
    ]
  },
  plugins,
  ...webpack_settings
}