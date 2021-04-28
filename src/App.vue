<template>
  <v-app>
    <!-- appbar -->
    <v-app-bar
      app
      color="primary"
      dark
      src="appbar.jpg"
      prominent
      height="100"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-container class="py-0 header-container px-4">
        <v-row class="px-4">
          <!-- ドロワーアイコン -->
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>

        <!-- タイトル -->
          <v-app-bar-title class="text-h4">
            <router-link
            :to="{ name: 'Playlists' }"
            class="text-decoration-none primary--text"
            >
            {{ $store.state.appTitle }}
            </router-link>
          </v-app-bar-title>

          <v-spacer></v-spacer>

          <!-- 検索バー -->
          <!-- 検索スペースを広げるためにgridを使った(v-container&v-row) -->
          <Search/>
        </v-row>

      </v-container>
    </v-app-bar>

    <!-- ドロワーメニュー -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      app
      :mobile-breakpoint="768"
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
        <v-btn
        @click="logout"
        >ログアウト</v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
        { title: 'Playlists', icon: 'mdi-view-dashboard', to: {name: 'Playlists'} },
        { title: 'About', icon: 'mdi-forum', to: {name: 'About'} },
        { title: 'ログイン', icon: 'mdi-forum', to: {name: 'Form'} },
      ],
    }
  },
  methods: {
    logout() {
      this.$store.state.playlists = [] //他の人に表示されないように念の為初期値に戻す
      projectAuth.signOut()
      .then(() => {
        this.$store.state.step = 1
        this.$router.push({ name: 'Form' })
        console.log('ログアウトしました')
      })
    }
  }
}
</script>

<style lang="sass">
  .header-container
    max-width: none !important
  // .v-app-bar-title__content
  //   top: 0
  //   left: 50%
  //   transform: translateX(-50%)
</style>