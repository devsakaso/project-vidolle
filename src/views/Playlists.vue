<template>
  <div class="home">

    <!-- playlistがあるとき -->
    <UserPlaylists/>

    <!-- playlistがないとき -->
    <NoPlaylists/>

    
  </div>
</template>

<script>
import UserPlaylists from '@/components/Playlists/UserPlaylists.vue'
import NoPlaylists from '@/components/Playlists/NoPlaylists.vue'


export default {
  name: 'Playlists',
  components: {
    UserPlaylists,
    NoPlaylists,
  }
}
</script>
