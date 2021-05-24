<template>
  <v-app>
    <!-- appbar -->
    <v-app-bar
      app
      color="primary"
      dark
      prominent
      height="80"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          color="primary"
        ></v-img>
      </template>

      <v-container class="py-0 header-container px-4 py-4">
        <v-row class="px-4">
          <!-- ドロワーアイコン -->
          <v-app-bar-nav-icon @click="drawer = !drawer" class=" blue--text text--lighten-5"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>

        <!-- タイトル -->
          <v-app-bar-title>
            <router-link
            :to="{ name: 'Playlists' }"
            class="text-decoration-none blue--text text--lighten-5 title"
            >
            {{ $store.state.appTitle }}
            </router-link>
          </v-app-bar-title>

          <v-spacer></v-spacer>

          <!-- 検索バー -->
          <!-- 検索スペースを広げるためにgridを使った(v-container&v-row) -->
          <Search v-if="$store.state.isSignIn"/>
        </v-row>

      </v-container>
    </v-app-bar>

    <!-- ドロワーメニュー -->
    <v-navigation-drawer
      v-model="drawer"
      app
      :mobile-breakpoint="900"
    >
      <!-- ユーザー情報 -->
      <v-list-item v-show="$store.state.isSignIn" class="my-3">
        <v-list-item-icon>
          <v-icon class="primary--text text--accent-3">mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="primary--text text--accent-3">{{ $store.getters.userProfile }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <!-- メニューアイテム -->
      <v-list dense>
        <v-list-item
          v-for="item in computedItems"
          :key="item.title"
          link
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon class="primary--text text--accent-3">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="primary--text text--accent-3">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- ログアウトボタン -->
      <template v-slot:append>
        <div class="pa-2 mb-10" v-show="$store.state.isSignIn">
          <v-btn block outlined class="primary--text text--accent-3 font-weight-bold" @click="logout">
            ログアウト
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- main -->
    <v-main>
      <router-view></router-view>
      <!-- スナックバー -->
      <Snackbar/>
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from '@/components/shared/Snackbar.vue'
import Search from '@/components/tools/Search.vue'
import { projectAuth } from '@/firebase/config'

export default {
  name: 'App',
  components: {
    Snackbar,
    Search,
  },
  data() {
    return {
      drawer: false,
      items: [
        { title: 'Playlists', icon: 'mdi-view-dashboard', to: {name: 'Playlists'}, requireAuth: true},
        { title: 'About', icon: 'mdi-forum', to: {name: 'About'}, requireAuth: '' },
        { title: 'PrivacyPolicy', icon: 'mdi-forum', to: {name: 'PrivacyPolicy'}, requireAuth: '' },
        { title: 'ログイン', icon: 'mdi-forum', to: {name: 'Form'}, requireAuth: false },
      ]
    }
  },
  computed: {
    // ログイン中かどうかで表示/非表示
    computedItems() {
      return this.items.filter(item => {
        if(item.title === 'Playlists') {
          return item.requireAuth = this.$store.state.isSignIn
        } else if (item.title === 'ログイン') {
          return item.requireAuth = !this.$store.state.isSignIn
        } else {
          return true
        }
      })
    }
  },
  methods: {
    async logout() {
      (async () => {
        // 関数のとき
      if(typeof this.$store.state.unsubscribe === 'function') {
        // console.log('this.$store.state.unsubscribe', this.$store.state.unsubscribe);
        await this.$store.state.unsubscribe()
      } 
      })()
      .then(() => {
          projectAuth.signOut()
      })
      .then(() => {
          this.$store.commit('reset')
          this.$store.state.step = 1
          this.$router.push({ name: 'Form' })
          // console.log('ログアウトしました')
      })
      .catch(err => console.log('エラー',err.message))
    }
  }
}
</script>

<style lang="sass">
  @import url('https://fonts.googleapis.com/css2?family=Knewave&display=swap')

  .header-container
    max-width: none !important
  .v-application .title
    font-family: 'Knewave', cursive, sans-serif !important
</style>