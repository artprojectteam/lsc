import Distance from '../modules/calc/Distance'
import Time from '../modules/calc/Time'
import Transfer from '../modules/calc/Transfer'
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
  TIME_U_SEC,
  TRANSFER,
  TRANSFER_BYTE,
  TRANSFER_GB,
  TRANSFER_KB,
  TRANSFER_MB,
  TRANSFER_PB,
  TRANSFER_SUB,
  TRANSFER_TB
} from '../modules/unit'

self.addEventListener('message', (event) => {
  const { category, index, number } = event.data

  // calc result
  switch (category) {
    case TIME:
      const time = funcTime(index, number)
      self.postMessage(time)
      return false
    case DISTANCE:
      const distance = funcDistance(index, number)
      self.postMessage(distance)
      return false
    case TRANSFER:
      const transfer = funcTransfer(index, number)
      self.postMessage(transfer)
      return false
    default:
      // 該当なし
      self.postMessage([])
      return false
  }
}, false)

/**
 * time
 * @param index
 * @param number
 * @return {Array}
 */
function funcTime (index, number) {
  const time = new Time()

  switch (TIME_SUB[index]) {
    case TIME_U_MICRO:
      return time.selectMicro(number)
    case TIME_U_MS:
      return time.selectMs(number)
    case TIME_U_SEC:
      return time.selectSec(number)
    case TIME_U_MIN:
      return time.selectMin(number)
    case TIME_U_HOUR:
      return time.selectHour(number)
    case TIME_U_DAY:
      return time.selectDay(number)
    default:
      return []
  }
}

/**
 * distance
 * @param index
 * @param number
 * @return {Array}
 */
function funcDistance (index, number) {
  const distance = new Distance()

  switch (DISTANCE_SUB[index]) {
    case DISTANCE_U_MM:
      return distance.selectMm(number)
    case DISTANCE_U_CM:
      return distance.selectCm(number)
    case DISTANCE_U_M:
      return distance.selectM(number)
    case DISTANCE_U_KM:
      return distance.selectKm(number)
    case DISTANCE_U_MILE:
      return distance.selectMile(number)
    case DISTANCE_U_YARD:
      return distance.selectYard(number)
    case DISTANCE_U_FOOT:
      return distance.selectFoot(number)
    case DISTANCE_U_INCH:
      return distance.selectInch(number)
    case DISTANCE_U_NM:
      return distance.selectNm(number)
    default:
      return []
  }
}

/**
 * transfer
 * @param index
 * @param number
 * @return {Array}
 */
function funcTransfer (index, number) {
  const transfer = new Transfer()

  switch (TRANSFER_SUB[index]) {
    case TRANSFER_BYTE:
      return transfer.selectByte(number)
    case TRANSFER_KB:
      return transfer.selectKB(number)
    case TRANSFER_MB:
      return transfer.selectMB(number)
    case TRANSFER_GB:
      return transfer.selectGB(number)
    case TRANSFER_TB:
      return transfer.selectTB(number)
    case TRANSFER_PB:
      return transfer.selectPB(number)
    default:
      return []
  }
}