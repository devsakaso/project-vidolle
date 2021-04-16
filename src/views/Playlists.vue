<template>
  <div class="home">
    <UserPlaylists/>

    
  </div>
</template>

<script>
import UserPlaylists from '@/components/Playlists/UserPlaylists.vue'


export default {
  name: 'Playlists',
  components: {
    UserPlaylists,
  }
}
</script>
