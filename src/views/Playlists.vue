<template>
  <div class="home">

    <!-- playlistがあるとき -->
    <UserPlaylists/>

    <!-- playlistがないとき -->
    <NoPlaylists/>

    
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
