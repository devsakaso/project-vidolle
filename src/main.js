import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { projectAuth } from '@/firebase/config'



// import firebase from 'firebase/app'
// import 'firebase/firestore'
// import 'firebase/auth'



Vue.config.productionTip = false

let app = null
projectAuth.onAuthStateChanged(() => {
console.log('userの状態が変化した');
  // すでにcreatedされていない場合にappを初期化
  if(!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
    }).$mount('#app')
  }

})





// firebase.auth().onAuthStateChanged(user => {
//   if (user) {
//     if (user.ma) {
//       localStorage.setItem('jwt', user.ma);
//     } 
//     this.$store.commit('onAuthEmailChanged', user.email);
//     if (user.uid) {
//       this.$store.commit('onUserStatusChanged', true) 
//     } else {
//       this.$store.commit('onUserStatusChanged', false)
//     }
//   } else {
//     this.$store.commit('onAuthEmailChanged', "")
//   }
//   new Vue({
//     router,
//     store,
//     vuetify,
//     render: h => h(App)
//   }).$mount("#app");

// })