import Meta from 'vue-meta'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import compA from './vue/_template'

// 通常
Vue.component('comp-a', compA)

/**
 * ルーター導入
 * Usage: npm i -D vue-router
 */
Vue.use(VueRouter)

/**
 * ストア導入
 * Usage: npm i -D vuex
 */
Vue.use(Vuex)

/**
 * Metaの導入
 * Usage: npm i -D vue-meta
 */
Vue.use(Meta)

const apps = new Vue({
  // ルーター
  router: {
    mode: 'history',
    routes: [
      {
        path: '',
        components: { flogAbc }
      }
    ],
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },

  // ストア
  store: new Vuex.store({
    modules: {}
  }),


  // @see: https://github.com/declandewet/vue-meta
  metaInfo: {
    titleTemplate: (chunk) => {
      return chunk ? `${chunk} | hoge` : 'hoge'
    }
  }
})

// const apps = new Vue()
apps.$mount('#apps')