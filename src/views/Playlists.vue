<template>
  <div class="home">

    <!-- playlistがあるとき -->
    <UserPlaylists v-if="$store.state.playlists.length"/>

    <!-- playlistがないとき -->
    <NoPlaylists v-else/>

    <!-- TODO: ソートの導入中止中 -->
    <!-- ソートがtrueのときのみ表示 -->
    <!-- <ButtonDoneSorting v-if="$store.state.sorting"/> -->
    
  </div>
</template>

<script>
import UserPlaylists from '@/components/playlists/UserPlaylists.vue'
import NoPlaylists from '@/components/playlists/NoPlaylists.vue'
// import ButtonDoneSorting from '@/components/tools/ButtonDoneSorting.vue'
import { projectAuth } from '@/firebase/config'

export default {
  name: 'Playlists',
  components: {
    UserPlaylists,
    NoPlaylists,
    // ButtonDoneSorting,
  },
  mounted() {
    let userId = projectAuth.currentUser.uid
    if(userId) {
      this.$store.commit('setUser', userId)
      this.$store.dispatch('getPlaylists', userId)
    }
  }
}
</script>
