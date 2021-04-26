<template>
  <div class="home">
    <v-container>
          <div>Playlists.vue: {{$store.state.user}}</div>
    </v-container>

    <!-- playlistがあるとき -->
    <UserPlaylists v-if="$store.state.playlists.length"/>

    <!-- playlistがないとき -->
    <NoPlaylists v-else/>

    <!-- ソート終了ボタン -->
    <!-- ソートがtrueのときのみ表示 -->
    <ButtonDoneSorting v-if="$store.state.sorting"/>
    
  </div>
</template>

<script>
import UserPlaylists from '@/components/playlists/UserPlaylists.vue'
import NoPlaylists from '@/components/playlists/NoPlaylists.vue'
import ButtonDoneSorting from '@/components/tools/ButtonDoneSorting.vue'
import { projectAuth } from '@/firebase/config'

export default {
  name: 'Playlists',
  components: {
    UserPlaylists,
    NoPlaylists,
    ButtonDoneSorting,
  },
  mounted() {
    let userId = projectAuth.currentUser.uid
    this.$store.commit('setUser', userId)
    if (userId !== this.$store.state.user) {
      console.log('playlists.vueから', userId);
      console.log('playlists.vueからthis.$store.state.user', this.$store.state.user);
    }
    this.$store.dispatch('getPlaylists', userId)
  },
  computed: {
    username() {
      return this.$store.getters.user
    },
    userStatus() {
      //return true in login state
      return this.$store.getters.isSignIn
    },
  }
}
</script>
