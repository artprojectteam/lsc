import browserSync from 'browser-sync'
import config from 'config'
import historyApiFallback from 'connect-history-api-fallback'
import { BLUE, COLOR_RESET, DIST, GREEN, RED } from '../const'

const dir = `${DIST}/`
const usePHP = config.get('usePHP')

// Log
console.log(`========================`)
console.log(`${BLUE}Usage: ${COLOR_RESET + GREEN}\`$ npm run server -s\`${COLOR_RESET} require \`${RED}-s${COLOR_RESET}\`!!`)

if (usePHP) {
  console.log(`${BLUE}PHP Server Usage: ${COLOR_RESET + GREEN}\`$ cd ${dir} & php -S ${config.get('phpServerAddress')}\`${COLOR_RESET}`)
}
console.log(`========================\n`)
// End Log

const { baseFile, server, proxy } = (() => {
  const baseFile = `${dir}**/*`

  if (usePHP) {
    return {
      baseFile,
      server: null,
      proxy: config.get('phpServerAddress')
    }
  } else {
    return {
      baseFile,
      server: dir
    }
  }
})()

const { serveStatic, serveStaticOption, startPath } = (() => {
  const root = config.get('output.root').replace(/\/$/, '')
  const serve = []

  if (root !== '') {
    serve.push({
      route: [root],
      dir: DIST
    })
  }

  return {
    serveStatic: serve,
    serveStaticOption: {},
    startPath: `${root}/${config.get('startPath')}`
  }
})()

// middleware
const middleware = []

if (config.get('history')) {
  const index = config.get('options.pug2php') ? 'index.php' : 'index.html'
  middleware.push(historyApiFallback({
    index: `/${index}`
  }))
}


/** @see: http://www.browsersync.io/docs/options/ */
browserSync({
  ui: {
    port: 3001,
    weinre: {
      port: 8080
    }
  },
  files: [baseFile],
  watchEvents: ['change'],
  watch: false,
  ignore: [],
  single: config.get('history') && !config.get('options.pug2php'),
  watchOptions: {
    ignoreInitial: true,
    ignored: '*.txt'
  },
  server,
  proxy,
  port: 3000,
  middleware: [],
  serveStatic,
  serveStaticOption,
  https: config.get('https'),
  httpModule: undefined,
  cwd: undefined,
  callbacks: {
    ready: undefined
  },
  ghostMode: config.get('ghostMode'),
  loglevel: 'info',
  logPrefix: 'BS',
  logConnections: false,
  logFileChanges: true,
  logSnippet: true,
  // snippetOptions: {
  //   async: undefined,
  //   blacklist: undefined,
  //   whitelist: undefined,
  //   rule: {
  //     match: /$/,
  //     fn: Function
  //   }
  // },
  rewriteRules: false,
  tunnel: null,
  online: undefined,
  open: 'external', //'local',
  browser: 'default',
  cors: true,
  xip: false,
  reloadOnRestart: false,
  notify: false,
  scrollProportionally: true,
  scrollThrottle: 0,
  scrollRestoreTechnique: 'window.name',
  scrollElements: [],
  scrollElementMapping: [],
  reloadDelay: 0,
  reloadDebounce: 0,
  reloadThrottle: 0,
  plugins: [],
  injectChanges: true,
  startPath,
  minify: true,
  host: null,
  localOnly: false,
  codeSync: true,
  timestamps: true,
  scriptPath: undefined,
  socket: {
    path: '/browser-sync/socket.io',
    clientPath: '/browser-sync',
    namespace: '/browser-sync',
    domain: undefined,
    port: undefined,
    clients: {
      heartbeatTimeout: 5000
    },
    socketIoOptions: {
      log: false
    },
    socketIoClientConfig: {
      reconnectionAttempts: 50
    }
  },
  script: undefined
})