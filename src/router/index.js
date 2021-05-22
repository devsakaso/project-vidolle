import Vue from 'vue'
import VueRouter from 'vue-router'
import Playlists from '../views/Playlists.vue'
import UserPlaylistDetails from '../views/UserPlaylistDetails.vue'
import Form from '../views/auth/Form.vue'

// storeにアクセスするため
import store from '@/store/index.js'

// VuetifyのgoToというスクロール制御を使って、aboutページとかで下までスクロールしたら他のページでも下から始まってしまう現象を解決する
import goTo from 'vuetify/es5/services/goto'

// route guard
import { projectAuth } from '../firebase/config'
// import Firebase from '../firebase/config'

Vue.use(VueRouter)

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (!user) {
    store.state.step = 1
    next({ name: 'Form' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Playlists',
    component: Playlists,
    beforeEnter: requireAuth
    // meta: {requiresAuth: true}
  },
  {
    path: '/form',
    name: 'Form',
    component: Form
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/playlists/:id',
    name: 'playlist',
    component: UserPlaylistDetails,
    props: true,
    beforeEnter: requireAuth
    // meta: {requiresAuth: true}

  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// routerのnameをタイトルの後に続くように設定
router.beforeEach((to, from, next) => {
//   if(to.matched.some(rec => rec.meta.requiresAuth)) {
//     let user = projectAuth.currentUser
//     if(!user) {
//       next({ name: 'Login' })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
  document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`
  next()
})


// router.beforeEach((to, from, next) => {
//   Firebase.onAuth();
//   let currentUserStatus = this.$store.getters["isSignIn"]
//   let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//   if (!requiresAuth ) {
//     next()
//   } else if (requiresAuth && !currentUserStatus) {
//     next('/signup');
//   } else {
//     next();
//   }

// })




// 0はトップなのでtoTo(0)とする
router.afterEach(() => {
  goTo(0, {duration: 0})
})

export default router
