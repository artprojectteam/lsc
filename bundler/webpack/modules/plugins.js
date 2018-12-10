import Minify from 'babel-minify-webpack-plugin'

// 参考：https://webpack.js.org/plugins/babel-minify-webpack-plugin/
export const minifyPlugin = new Minify({
  deadcode: true,
  removeConsole: true
}, {
  sourceMap: false,
  comments: /^\**!|@preserve|@license|@cc_on/
})