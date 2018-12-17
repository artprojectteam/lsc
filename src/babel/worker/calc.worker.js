import Distance from '../modules/calc/Distance'
import Time from '../modules/calc/Time'
import Transfer from '../modules/calc/Transfer'
import { DISTANCE, DISTANCE_SUB, TIME, TIME_SUB, TRANSFER, TRANSFER_SUB } from '../modules/unit'

self.addEventListener('message', (event) => {
  const { current, index, number } = event.data

  switch (current) {
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
}, true)

/**
 * time
 * @param index
 * @param number
 * @return {Array}
 */
function funcTime (index, number) {
  const time = new Time()

  switch (TIME_SUB[index]) {
    case 'μs':
      return time.selectMicro(number)
    case 'ms':
      return time.selectMs(number)
    case 'sec':
      return time.selectSec(number)
    case 'min':
      return time.selectMin(number)
    case 'hour':
      return time.selectHour(number)
    case 'day':
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
    case 'knot':
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