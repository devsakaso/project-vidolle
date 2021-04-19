import Vue from 'vue'
import VueRouter from 'vue-router'
import Playlists from '../views/Playlists.vue'
import UserPlaylistDetails from '@/components/playlists/UserPlaylistDetails.vue'

// VuetifyのgoToというスクロール制御を使って、aboutページとかで下までスクロールしたら他のページでも下から始まってしまう現象を解決する
import goTo from 'vuetify/es5/services/goto'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Playlists',
    component: Playlists
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
    name: 'UserPlaylistDetails',
    component: UserPlaylistDetails,
    props: true
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
