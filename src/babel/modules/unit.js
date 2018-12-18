export const TIME = 'time'
export const DISTANCE = 'distance'
export const TRANSFER = 'transfer'

// time
export const TIME_U_MICRO = 'μs'
export const TIME_U_MS = 'ms'
export const TIME_U_SEC = 'sec'
export const TIME_U_MIN = 'min'
export const TIME_U_HOUR = 'hour'
export const TIME_U_DAY = 'day'

export const TIME_SUB = [TIME_U_MICRO, TIME_U_MS, TIME_U_SEC, TIME_U_MIN, TIME_U_HOUR, TIME_U_DAY]

// distance
export const DISTANCE_U_MM = 'mm'
export const DISTANCE_U_CM = 'cm'
export const DISTANCE_U_M = 'm'
export const DISTANCE_U_KM = 'km'
export const DISTANCE_U_MILE = 'mile'
export const DISTANCE_U_YARD = 'yard'
export const DISTANCE_U_FOOT = 'foot'
export const DISTANCE_U_INCH = 'inch'
export const DISTANCE_U_NM = 'nautical mile'

export const DISTANCE_SUB = [DISTANCE_U_MM, DISTANCE_U_CM, DISTANCE_U_M, DISTANCE_U_KM, DISTANCE_U_MILE, DISTANCE_U_YARD, DISTANCE_U_FOOT, DISTANCE_U_INCH, DISTANCE_U_NM]

// transfer
export const TRANSFER_BYTE = 'byte'
export const TRANSFER_KB = 'KB'
export const TRANSFER_MB = 'MB'
export const TRANSFER_GB = 'GB'
export const TRANSFER_TB = 'TB'
export const TRANSFER_PB = 'PB'

export const TRANSFER_SUB = [TRANSFER_BYTE, TRANSFER_KB, TRANSFER_MB, TRANSFER_GB, TRANSFER_TB, TRANSFER_PB]

/**
 * サブカテゴリの取得
 * @param {string} id
 * @return {*}
 */
export const subCategory = (id) => {
  switch (id) {
    case TIME:
      return TIME_SUB
    case DISTANCE:
      return DISTANCE_SUB
    case TRANSFER:
      return TRANSFER_SUB
    default:
      return []
  }
}