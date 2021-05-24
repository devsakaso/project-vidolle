import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { projectAuth } from '@/firebase/config'


Vue.config.productionTip = false

let app = null
projectAuth.onAuthStateChanged(() => {
  // すでにcreatedされていない場合にappを初期化
  if(!app) {
    // console.log('userの状態が変化した');
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
    }).$mount('#app')
  }
})