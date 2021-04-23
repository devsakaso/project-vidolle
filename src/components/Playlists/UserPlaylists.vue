<template>
  <div>
    <h2 class="primary--text my-4">すべてのプレイリスト</h2>
    <v-list
    rounded
    class="pt-0 mx-auto"
    max-width="1200px"
    two-line
    >

      <UserPlaylist
      v-for="playlist in playlists"
      :key="playlist.id"
      :playlist="playlist"
      />
    </v-list>
  </div>
</template>

<script>
import UserPlaylist from '@/components/playlists/UserPlaylist.vue'

export default {
  name: 'UserPlaylists',
    components: {
      UserPlaylist,
  },
  computed: {
    playlists: {
      get() {
        return this.$store.getters.playlistsFiltered
      },
      set(value) {
        this.$store.dispatch('setPlaylists', value)
      }
    }
  },
  
}
</script>

<style>

</style>