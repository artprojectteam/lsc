import config from 'config'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import phpFilter from 'pug-php-filter'
import { DIST, PROD } from '../../const'
import { NODE_ENV } from '../../modules/Env'
import { FileList } from '../../modules/FileList'
import { absolutePath } from '../../modules/getPath'
import { webpack_progress, webpack_settings } from '../modules/commonSettings'
import { fileLoader, pugLintLoader } from '../modules/loaders'
import { getData, getDir, getOgpPrefix, getPageData, getRoot, getSiteData } from '../modules/pugFunction'
import TaskMessage from '../plugins/TaskMessage'

//*********** loader ***************//
const htmlLoader = {
  loader: 'html-loader',
  options: {
    attrs: config.get('options.useFileLoader.pug') ? ['img:src', ':data-src', 'amp-img', 'video:src', 'source:src'] : [],
    interpolate: true
  }
}

const pugLoader = {
  loader: 'pug-html-loader',
  options: {
    doctype: 'html',
    pretty: !config.get('options.minify'),
    cache: true,
    filters: {
      php: phpFilter
    },
    // グローバル変数
    data: {
      IS_PHP: config.get('options.pug2php'),
      IS_PRODUCTION: NODE_ENV === PROD,
      getData,
      getSiteData,
      getPageData,
      getOgpPrefix,
      getRoot,
      getDir
    }
  }
}

//*********** rules ***************//
const extract = {
  test: /\.pug$/,
  use: ExtractTextPlugin.extract({
    fallback: '',
    publicPath: DIST,
    use: [htmlLoader, pugLoader]
  })
}

//*********** webpack run ***************//
const inputPath = absolutePath([config.get('input.root'), config.get('input.files.pug')])
const ext = config.get('options.pug2php') ? 'php' : 'html'

export const pug = {
  mode: NODE_ENV,
  context: inputPath,
  entry: () => new Promise((resolve) => {
    const file = FileList(inputPath, 'pug')
    resolve(file)
  }),
  output: {
    path: absolutePath([DIST]),
    publicPath: '',
    filename: `[name].${ext}`
  },
  module: {
    rules: [
      extract,
      fileLoader([], config.get('output.files.img'), config.get('options.imageHash.pug')),
      pugLintLoader(/^(?!_).*\.pug$/, 'pug-lint-loader')
    ]
  },
  plugins: [
    new TaskMessage('pug'),
    new ExtractTextPlugin({
      filename: `[name].${ext}`,
      disable: false,
      allChunks: true
    }),
    new ProgressBarPlugin(webpack_progress('pug'))
  ],
  ...webpack_settings
}