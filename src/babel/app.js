import { store } from './modules/store'
import header from './vue/header'
import footer from './vue/footer'
import main from './vue/main'
import button from './vue/parts/button'

Vue.component('content-header', header)
Vue.component('content-footer', footer)
Vue.component('content-main', main)

// パーツ
Vue.component('v-button', button)

const apps = new Vue({
  store
})

apps.$mount('#apps')