import autoprefixer from 'autoprefixer'
import config from 'config'
import mqpacker from 'css-mqpacker'
import gifscale from 'imagemin-gifsicle'
import jpegtran from 'imagemin-jpegtran'
import pngquant from 'imagemin-pngquant'
import svgo from 'imagemin-svgo'
import { imageminLoader } from 'imagemin-webpack'
import lint from '~/.pug-lintrc'
import { rootRelativePath } from '../../modules/getPath'
import OutputDirDiff from '../../modules/OutputDirDiff'

export const yamlLoader = {
  test: /\.ya?ml$/,
  use: [
    { loader: 'json-loader' },
    { loader: 'yaml-loader' }
  ]
}

export const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: false,
    plugins: () => [autoprefixer(), mqpacker()]
  }
}

export const stylusLoader = {
  loader: 'stylus-loader',
  options: {
    sourceMap: false,
    'include css': true,
    define: null
  }
}

export const esLintLoader = {
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  options: {
    failOnError: true
  }
}

export const workerLoader = {
  test: /\.worker\.js$/,
  use: [{
    loader: 'worker-loader',
    options: {
      publicPath: rootRelativePath(config.get('output.files.js')),
      name: '[name].js'
    }
  }]
}

export const babelLoader = {
  test: /\.js$/,
  loader: 'babel-loader'
}

/**
 * file-loaderの設定
 * @param {string[]} base
 * @param {string[]} target
 * @param {boolean} isHash
 * @param {boolean} isRelative
 * @return {{test: RegExp, use: *[]}}
 */
export const fileLoader = (base, target, isHash, isRelative = false) => {
  const dirDiff = new OutputDirDiff(base, target)
  const relativePath = dirDiff.targetRelativePath()

  return {
    test: /\.(png|jpe?g|gif|svg)$/i,
    use: [{
      loader: 'file-loader',
      options: {
        name: '[name].[ext]' + (isHash ? '?[hash:6]' : ''),
        useRelativePath: false,
        outputPath: relativePath,
        publicPath: isRelative ? relativePath : rootRelativePath(target),
        emitFile: true
      }
    }, {
      loader: imageminLoader,
      options: {
        cache: true,
        bail: false,
        imageminOptions: {
          plugins: [
            gifscale({ interlaced: true }),
            jpegtran({ progressive: true }),
            pngquant({ optimizationLevel: 5 }),
            svgo({ removeViewBox: true })
          ]
        }
      }
    }]
  }
}

/**
 * pug lint
 * @param {RegExp} regex
 * @param {string} loader
 * @return {{test: *, exclude: RegExp, loader: *, options: {emitError: boolean}, enforce: string}}
 */
export const pugLintLoader = (regex, loader) => {
  return {
    test: regex,
    exclude: /node_modules/,
    loader,
    options: { emitError: true, ...lint },
    enforce: 'pre'
  }
}