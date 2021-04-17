<template>
  <v-app>
    <!-- appbar -->
    <v-app-bar
      app
      color="primary"
      dark
      src="appbar.jpg"
      prominent
      :height="$route.path === '/' ? '235' : '170'"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-container class="pa-0 header-container">
        <v-row>
          <!-- ドロワーアイコン -->
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>

          <v-app-bar-title>Vidolle</v-app-bar-title>

          <v-spacer></v-spacer>

          <!-- 検索バー -->
          <!-- 検索スペースを広げるためにgridを使った(v-container&v-row) -->
          <Search/>
        </v-row>

          <!-- プレイリスト追加のフィールド -->
          <FieldAddPlaylist v-if="$route.path === '/'" />
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
import FieldAddPlaylist from '@/components/playlists/FieldAddPlaylist.vue'
import Snackbar from '@/components/shared/Snackbar.vue'
import Search from '@/components/tools/Search.vue'

export default {
  name: 'App',
  components: {
    FieldAddPlaylist,
    Snackbar,
    Search,
  },
  data() {
    return {
      drawer: false,
      items: [
        { title: 'Playlists', icon: 'mdi-view-dashboard', to: '/' },
        { title: 'About', icon: 'mdi-forum', to: '/about' },
      ],
    }
  },
  mounted() {
    this.$store.dispatch('getPlaylists')
  }
};
</script>

<style lang="sass">
  .header-container
    max-width: none !important
</style>