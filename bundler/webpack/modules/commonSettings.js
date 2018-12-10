import config from 'config'
import { BLUE, COLOR_RESET, GREEN, TEST, YELLOW } from '../../const'
import { NODE_ENV } from '../../modules/Env'
import { readYaml } from '../../modules/readYaml'

const { stats, performance } = readYaml('webpack')

// プログレスバーのオプション
export const webpack_progress = (task) => {
  return {
    format: `${BLUE + task + COLOR_RESET} build ${YELLOW}:percent${COLOR_RESET}/${GREEN}:total%${COLOR_RESET} (:elapseds)`,
    clear: true
  }
}

export const webpack_settings = {
  devtool: false,
  cache: true,
  stats,
  performance
}

// babel専用設定
export const babel_settings = {
  devtool: config.get('options.sourceMap') ? 'source-map' : false,
  cache: true,
  stats,
  performance
}

export const webpack_provide = readYaml('provide')

// 複数のファイルで共通のロジックを分割(testモードの時は除く)
// 参考：https://webpack.js.org/plugins/split-chunks-plugin/
export const babel_optimization = NODE_ENV === TEST
  ? {}
  : {
    splitChunks: {
      name: config.get('options.optimizeName'),
      chunks: 'all',
      minChunks: 2
    }
  }