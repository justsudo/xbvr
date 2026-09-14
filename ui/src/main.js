import Buefy from 'buefy'
import Vue from 'vue'
import vueDebounce from 'vue-debounce'
import App from './App.vue'
import i18n from './i18n'
import router from './router'
import store from './store'
import 'buefy/dist/buefy.css'
import './dark-theme.scss'

import 'video.js/dist/video-js.css'
import 'videojs-vr/dist/videojs-vr.css'
import '@fortawesome/fontawesome-free/js/all'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
Vue.config.keyCodes = {
  arrowLeft: 37,
  arrowRight: 39,
  questionMark: 63
}
Vue.use(Buefy)
Vue.use(vueDebounce)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
