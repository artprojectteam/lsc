const state = {
  // 小数点を扱いやすくするために文字列にする
  numberStr: '100'
}

const mutations = {
  update (state, { val }) {
    if (isNaN(Number(val))) return false

    state.numberStr = /^0+\d/.test(val) ? val.slice(1) : val
  }
}

const getters = {}

const actions = {
  async update ({ commit }, { val }) {
    const check = checkDigit(val)

    if (check != null) return check

    await commit('update', { val })

    return null
  }
}

export const display = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}

// 正数12桁(兆)、小数点以下5桁まで
function checkDigit (str) {
  if (Number(str) === 0) return null

  const arr = str.split('.')

  // 小数点
  if (arr.length === 2 && arr[1].length > 5) return 'Not add any more'

  // 正数
  if (arr[0].length > 12) return 'Not add any more'

  return null
}