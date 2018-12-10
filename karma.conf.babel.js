import config from 'config'
import os from 'os'
import path from 'path'
import { babel } from './bundler/webpack/tasks/babel'
import { vue } from './bundler/webpack/tasks/vue'

const webpack = config.get('options.vue') ? vue : babel

const browsers = ['Chrome', 'Firefox']
if (os.platform() === 'darwin') browsers.push('Safari')

export default (config) => {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'power-assert', 'chai'],

    // list of files / patterns to load in the browser
    files: [
      { pattern: './test/[!_]*.spec.js' }
    ],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.spec.js': ['babel', 'webpack', 'espower']
    },

    babelPreprocessor: {
      options: {
        sourceMap: 'inline'
      },
      // filename: function (file) {
      //   return file.originalPath.replace(/\.js$/, '.es5.js');
      // },
      sourceFileName: function (file) {
        return file.originalPath
      }
    },

    webpack,

    // plugins: ['karma-coverage-istanbul-reporter'],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage-istanbul'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    browsers,

    customLaunchers: {
      // IE9: {
      //   base: 'IE',
      //   'x-ua-compatible': 'IE=EmulateIE9'
      // },
      // IE8: {
      //   base: 'IE',
      //   'x-ua-compatible': 'IE=EmulateIE8'
      // }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    client: {
      mocha: {
        // opts: 'test/mocha.opts',
        reporter: 'lcov'
      }
    },

    coverageIstanbulReporter: {

      // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib
      reports: ['html', 'lcovonly', 'text-summary'],

      // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
      // dir: path.join(__dirname, 'coverage'),
      dir: path.resolve('coverage'),

      // Combines coverage information from multiple browsers into one report rather than outputting a report
      // for each browser.
      combineBrowserReports: true,

      // if using webpack and pre-loaders, work around webpack breaking the source path
      fixWebpackSourcePaths: true,

      // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
      skipFilesWithNoCoverage: true,

      // Most reporters accept additional config options. You can pass these through the `report-config` option
      'report-config': {

        // all options available at: https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib/html/index.js#L135-L137
        html: {
          // outputs the report in ./coverage/html
          subdir: 'html'
        }

      }
    }
  })
}
