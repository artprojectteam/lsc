import config from 'config'

// 実行環境
export const DEV = 'development'
export const PROD = 'production'
export const TEST = 'test'
export const ENV_LIST = [DEV, PROD, TEST] // 実行可能なNODE_ENVの定数

// モード
export const ONCE = 'once'
export const WATCH = 'watch'

// カラー
export const COLOR_RESET = '\u001b[0m'
export const BLACK = '\u001b[30m'
export const WHITE = '\u001b[37m'
export const RED = '\u001b[31m'
export const GREEN = '\u001b[32m'
export const YELLOW = '\u001b[33m'
export const BLUE = '\u001b[34m'

// 出力先
// bs-config.jsではbabelが利用できないので同様のことを記述
export const DIST = `${config.get('output.prefix')}_${config.get('dist')}`