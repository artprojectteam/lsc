import Distance from '../modules/calc/Distance'
import Time from '../modules/calc/Time'
import Transfer from '../modules/calc/Transfer'
import {
  DISTANCE,
  DISTANCE_SUB,
  TIME,
  TIME_SUB, TIME_U_DAY,
  TIME_U_HOUR,
  TIME_U_MICRO,
  TIME_U_MIN,
  TIME_U_MS,
  TIME_U_SEC,
  TRANSFER,
  TRANSFER_SUB
} from '../modules/unit'

self.addEventListener('message', (event) => {
  const { category, index, number } = event.data

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
    case 'mm':
      return distance.selectMm(number)
    case 'cm':
      return distance.selectCm(number)
    case 'm':
      return distance.selectM(number)
    case 'km':
      return distance.selectKm(number)
    case 'mile':
      return distance.selectMile(number)
    case 'yard':
      return distance.selectYard(number)
    case 'foot':
      return distance.selectFoot(number)
    case 'inch':
      return distance.selectInch(number)
    case 'nautical mile':
      return distance.selectKnot(number)
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
    case 'byte':
      return transfer.selectByte(number)
    case 'KB':
      return transfer.selectKB(number)
    case 'MB':
      return transfer.selectMB(number)
    case 'GB':
      return transfer.selectGB(number)
    case 'TB':
      return transfer.selectTB(number)
    case 'PB':
      return transfer.selectPB(number)
    default:
      return []
  }
}