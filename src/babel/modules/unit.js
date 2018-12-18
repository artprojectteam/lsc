export const TIME = 'time'
export const DISTANCE = 'distance'
export const TRANSFER = 'transfer'

export const TIME_SUB = ['μs', 'ms', 'sec', 'min', 'hour', 'day']
export const DISTANCE_SUB = ['mm', 'cm', 'm', 'km', 'mile', 'yard', 'foot', 'inch', 'nautical mile']
export const TRANSFER_SUB = ['byte', 'KB', 'MB', 'GB', 'TB', 'PB']

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