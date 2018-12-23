import { DISTANCE, subCategory, TIME, TIME_SUB, TRANSFER } from '../../modules/unit'

const category = [TIME, DISTANCE, TRANSFER]

const state = {
  current: TIME,

  // サブカテゴリ
  category: TIME_SUB,

  // サブカテゴリのカレント
  index: 0,

  // 選択した結果の情報
  result: 0
}

const mutations = {
  changeCategory (state, { val }) {
    state.current = category.indexOf(val) > -1 ? val : TIME
    state.category = subCategory(state.current)
    state.index = 0
    state.result = 0
  },

  selectSubCategory (state, { index }) {
    state.index = state.category.length > index ? index : 0
    state.result = 0
  },

  selectResultIndex (state, { index }) {
    state.result = index
  }
}

const getters = {
  mainCategory () {
    return category
  }
}

const actions = {
  changeCategory: ({ commit }, { val }) => commit('changeCategory', { val }),
  selectSubCategory: ({ commit }, { index }) => commit('selectSubCategory', { index }),
  selectResultIndex: ({ commit }, { index }) => commit('selectResultIndex', { index })
}

export const unit = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}