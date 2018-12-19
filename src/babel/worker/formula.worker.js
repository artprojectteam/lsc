import Distance from '../modules/formula/Distance'
import Time from '../modules/formula/Time'
import Transfer from '../modules/formula/Transfer'
import {
  DISTANCE,
  DISTANCE_SUB,
  DISTANCE_U_CM,
  DISTANCE_U_FOOT,
  DISTANCE_U_INCH,
  DISTANCE_U_KM,
  DISTANCE_U_M,
  DISTANCE_U_MILE,
  DISTANCE_U_MM,
  DISTANCE_U_NM,
  DISTANCE_U_YARD,
  TIME,
  TIME_SUB,
  TIME_U_DAY,
  TIME_U_HOUR,
  TIME_U_MICRO,
  TIME_U_MIN,
  TIME_U_MS,
  TIME_U_SEC, TRANSFER, TRANSFER_BYTE, TRANSFER_GB, TRANSFER_KB, TRANSFER_MB, TRANSFER_PB, TRANSFER_SUB, TRANSFER_TB
} from '../modules/unit'

self.addEventListener('message', (event) => {
  const { category, unit, result } = event.data

  switch (category) {
    case TIME: {
      const res = funcTime(unit, result)
      self.postMessage(res)
      return false
    }
    case DISTANCE: {
      const res = funcDistance(unit, result)
      self.postMessage(res)
      return false
    }
    case TRANSFER: {
      const res = funcTransfer(unit, result)
      self.postMessage(res)
      return false
    }
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

function funcDistance (unit, result) {
  const distance = new Distance()

  switch (DISTANCE_SUB[unit]) {
    case DISTANCE_U_MM:
      return distance.atMm(result)
    case DISTANCE_U_CM:
      return distance.atCm(result)
    case DISTANCE_U_M:
      return distance.atM(result)
    case DISTANCE_U_KM:
      return distance.atKm(result)
    case DISTANCE_U_MILE:
      return distance.atMile(result)
    case DISTANCE_U_YARD:
      return distance.atYard(result)
    case DISTANCE_U_FOOT:
      return distance.atFoot(result)
    case DISTANCE_U_INCH:
      return distance.atInch(result)
    case DISTANCE_U_NM:
      return distance.atNm(result)
    default:
      return { title: null, body: 'Fail X(' }
  }
}

function funcTransfer (unit, result) {
  const transfer = new Transfer()

  switch (TRANSFER_SUB[unit]) {
    case TRANSFER_BYTE:
      return transfer.atByte(result)
    case TRANSFER_KB:
      return transfer.atKB(result)
    case TRANSFER_MB:
      return transfer.atMB(result)
    case TRANSFER_GB:
      return transfer.atGB(result)
    case TRANSFER_TB:
      return transfer.atTB(result)
    case TRANSFER_PB:
      return transfer.atPB(result)
    default:
      return { title: null, body: 'Fail X(' }
  }
}