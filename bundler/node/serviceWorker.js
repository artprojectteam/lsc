import { generateSW } from 'workbox-build'
import { DIST, GREEN } from '../const'

import { filename, serviceWorkerOptions } from '../const/service-worker'
import { UnitChangeForByte } from '../modules/UnitChangeForByte'
import Log from '../modules/Log'

// ファイル名が存在する場合のみ実行
if (filename) run()

function run () {
  generateSW({
    ...serviceWorkerOptions,
    swDest: `${DIST}/${filename}`
  })
    .then(({ count, size }) => {
      Log.complete(`generate ${filename}`)
      Log.message(`pre cache ${count} files, total: ${UnitChangeForByte(size)}`, GREEN)
    })
    .catch((e) => {
      Log.error(`generate ${filename}`, e)
    })
}