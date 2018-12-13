import Vuex from 'vuex'
import { display } from './display'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: { display }
})