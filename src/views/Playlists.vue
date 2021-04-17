<template>
  <div class="home">

    <!-- playlistがあるとき -->
    <UserPlaylists v-if="$store.state.playlists.length"/>

    <!-- playlistがないとき -->
    <NoPlaylists v-else/>
search word: {{$store.state.search}}
    
  </div>
</template>

<script>
import UserPlaylists from '@/components/playlists/UserPlaylists.vue'
import NoPlaylists from '@/components/playlists/NoPlaylists.vue'


export default {
  name: 'Playlists',
  components: {
    UserPlaylists,
    NoPlaylists,
  }
}
</script>
