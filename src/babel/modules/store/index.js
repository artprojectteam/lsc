import Vuex from 'vuex'
import { display } from './display'
import { unit } from './unit'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: { display, unit }
})