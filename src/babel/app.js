import { store } from './modules/store'
import footer from './vue/footer'
import header from './vue/header'
import main from './vue/main'
import ad from './vue/parts/ad'
import button from './vue/parts/button'

Vue.component('content-header', header)
Vue.component('content-footer', footer)
Vue.component('content-main', main)

// パーツ
Vue.component('v-button', button)
Vue.component('v-ad', ad)

const apps = new Vue({
  store
})

apps.$mount('#apps')