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
  },
  {
    path: '/form',
    name: 'Form',
    component: Form
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import(/* webpackChunkName: "about" */ '../views/PrivacyPolicy.vue')
  },
  {
    path: '/playlists/:id',
    name: 'playlist',
    component: UserPlaylistDetails,
    props: true,
    beforeEnter: requireAuth
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// routerのnameをタイトルの後に続くように設定
router.beforeEach((to, from, next) => {
  document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`
  next()
})


// 0はトップなのでtoTo(0)とする
router.afterEach(() => {
  goTo(0, {duration: 0})
})

export default router
