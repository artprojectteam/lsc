/**
 * 表示用の整形
 * @param {string} number
 * @return {string}
 */
export const formatter = (number) => {
  const arr = number.split('.')
  let num = arr[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

  if (arr[1] && arr[1].length > 0) num += `.${arr[1]}`

  return num
}