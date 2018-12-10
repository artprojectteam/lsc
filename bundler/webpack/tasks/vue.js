import config from 'config'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import VueLoaderPlugin from 'vue-loader/lib/plugin'
import webpack from 'webpack'
import { DIST, PROD } from '../../const'
import { NODE_ENV } from '../../modules/Env'
import { FileList } from '../../modules/FileList'
import { absolutePath } from '../../modules/getPath'
import { babel_optimization, babel_settings, webpack_progress, webpack_provide } from '../modules/commonSettings'
import { babelLoader, esLintLoader, fileLoader, postCssLoader, pugLintLoader, stylusLoader, workerLoader, yamlLoader } from '../modules/loaders'
import { minifyPlugin } from '../modules/plugins'
import TaskMessage from '../plugins/TaskMessage'

//*********** loader ***************//
const isFileLoader = config.get('options.useFileLoader.babel')

const transformAssetUrls = (() => {
  const video = isFileLoader ? ['src', 'poster', 'data-src'] : ''
  const source = isFileLoader ? ['src', 'data-src'] : ''
  const img = isFileLoader ? ['src', 'data-src'] : ''
  const image = isFileLoader ? 'xlink:href' : ''

  return { video, source, img, image }
})()

const loaders = []

loaders.push({
  test: /\.vue$/,
  loader: 'vue-loader',
  options: { transformAssetUrls }
})

// babel
loaders.push(esLintLoader)
loaders.push(babelLoader)
loaders.push(workerLoader)

// stylus
loaders.push({
  test: /\.stylus$/,
  use: [
    'vue-style-loader',
    {
      loader: 'css-loader',
      options: {
        url: isFileLoader,
        minimize: true,
        'import': true
      }
    },
    postCssLoader,
    stylusLoader
  ]
})

// pug
loaders.push({
  test: /\.pug$/,
  loader: 'pug-plain-loader',
  options: {
    doctype: 'html',
    pretty: true
  }
})

loaders.push(pugLintLoader(/\.vue$/, 'vue-pug-lint-loader'))

// yaml
loaders.push(yamlLoader)

// file-loaderを利用する場合
if (isFileLoader) {
  loaders.push(fileLoader(config.get('output.files.js'), config.get('output.files.img'), config.get('options.imageHash.babel')))
}

//*********** plugins ***************//
const plugins = [
  new webpack.DefinePlugin({  // グローバル定数
    IS_PRODUCTION: NODE_ENV === PROD
  }),
  new TaskMessage('vue'),
  new ProgressBarPlugin(webpack_progress('vue')),
  new webpack.ProvidePlugin({
    Vue: ['vue/dist/vue.esm.js', 'default'],
    ...webpack_provide
  }),
  new VueLoaderPlugin()
]

if (config.get('options.minify')) {
  plugins.push(minifyPlugin)
}

//*********** webpack run ***************//
const inputPath = absolutePath([config.get('input.root'), config.get('input.files.babel')])

export const vue = {
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
    extensions: ['.js', '.vue'],
    alias: {
      root: absolutePath([config.get('input.root')]),
      stylus: absolutePath([config.get('input.root'), config.get('input.files.stylus')]),
      pug: absolutePath([config.get('input.root'), config.get('input.files.pug')]),
      img: absolutePath([config.get('input.root'), 'img'])
    }
  },
  module: {
    rules: loaders
  },
  plugins,
  ...babel_settings
}