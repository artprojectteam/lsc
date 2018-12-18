import Time from '../modules/formula/Time'
import { TIME, TIME_SUB, TIME_U_DAY, TIME_U_HOUR, TIME_U_MICRO, TIME_U_MIN, TIME_U_MS, TIME_U_SEC } from '../modules/unit'

self.addEventListener('message', (event) => {
  const { category, unit, result } = event.data

  switch (category) {
    case TIME:
      const res = funcTime(unit, result)
      self.postMessage(res)
      return false
  }
}, false)

/**
 * time
 * @param {number} unit
 * @param {number} result
 * @return {*}
 */
function funcTime (unit, result) {
  const time = new Time()

  switch (TIME_SUB[unit]) {
    case TIME_U_MICRO:
      return time.atMicro(result)
    case TIME_U_MS:
      return time.atMs(result)
    case TIME_U_SEC:
      return time.atSec(result)
    case TIME_U_MIN:
      return time.atMin(result)
    case TIME_U_HOUR:
      return time.atHour(result)
    case TIME_U_DAY:
      return time.atDay(result)
    default:
      return { title: null, body: 'Fail X(' }
  }
}