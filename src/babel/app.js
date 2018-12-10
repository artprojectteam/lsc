import { store } from './modules/store'
import header from './vue/header'
import footer from './vue/footer'

Vue.component('content-header', header)
Vue.component('content-footer', footer)

const apps = new Vue({
  store
})

apps.$mount('#apps')