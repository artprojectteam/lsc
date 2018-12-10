/**
 * Service Worker Options
 * workboxを利用
 * @see: https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
 * 参考記事: https://qiita.com/nazonohito51/items/32b61cabdac8b24769bd
 */
import config from 'config'
import { DIST } from './index'

// ビルドしたときのファイル名
// 使用しない場合はnullにする
export const filename = null // 'sw.js'

// オプション
export const serviceWorkerOptions = {
  importWorkboxFrom: 'cdn',

  skipWaiting: false,
  clientsClaim: false,

  // 実行時にキャッシュへ追加(動的)
  runtimeCaching: [],

  // あらかじめキャッシュされていないURLに対するナビゲーション要求に応答するルートを作成(オフラインのフォールバックではない),
  navigateFallback: undefined,
  navigateFallbackBlacklist: [],
  navigateFallbackWhitelist: [],

  // 追加で読み込むService Worker
  importScripts: undefined,

  // プリキャッシュ一致を探す前に削除するパラメータ名を正規表現に変更
  ignoreUrlParametersMatching: [/^utm_/],

  directoryIndex: 'index.' + (config.get('options.pug2php') ? 'php' : 'html'),

  // キャッシュ名の先頭に付与するID
  cacheId: undefined,

  offlineGoogleAnalytics: false,

  // globPatternと照合するベースディレクトリ
  globDirectory: DIST,

  // キャッシュマニフェスト生成時にシンボリックリンクをたどるかどうか
  globFollow: true,

  // キャッシュマニフェスト生成時に常に除外するファイルパターン
  globIgnores: ['node_modules/**/*'],

  // キャッシュマニフェストに登録するパターン
  globPatterns: [
    '**/*.{js,css,html}'
  ],

  // キャッシュマニフェスト生成時にディレクトリ読み込みエラーだった場合にストップする
  globStrict: true,

  // SSRの場合のURLパターンでテンプレートを差し込む場合
  templatedUrls: undefined,

  maximumFileSizeToCacheInBytes: 2097152,

  // ファイル名にハッシュ値が挿入されている場合は検出する
  dontCacheBustUrlsMatching: undefined, // /\.\w{4}/

  // サーバ上とローカルでディレクトリが一致しない場合に削除するディレクトリ名
  modifyUrlPrefix: undefined,
  manifestTransforms: undefined
}