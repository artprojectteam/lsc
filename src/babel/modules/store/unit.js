import { DISTANCE, subCategory, TIME, TIME_SUB, TRANSFER } from '../../modules/unit'

const category = [TIME, DISTANCE, TRANSFER]

const state = {
  current: TIME,
  category: TIME_SUB, // サブカテゴリ
  index: 0 // サブカテゴリのカレント
}

const mutations = {
  changeCategory (state, { val }) {
    state.current = category.indexOf(val) > -1 ? val : TIME
    state.category = subCategory(state.current)
    state.index = 0
  },

  selectSubCategory (state, { index }) {
    state.index = state.category.length > index ? index : 0
  }
}

const getters = {
  mainCategory () {
    return category
  }
}

const actions = {
  changeCategory: ({ commit }, { val }) => commit('changeCategory', { val }),
  selectSubCategory: ({ commit }, { index }) => commit('selectSubCategory', { index })
}

export const unit = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}