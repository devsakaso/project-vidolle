<template>
  <div>
    <h2>すべてのプレイリスト</h2>
    <v-list
    flat
    class="pt-0"
    >

    </v-list>
    <UserPlaylist
    v-for="playlist in $store.getters.playlistsFiltered"
    :key="playlist.id"
    :playlist="playlist"
    />
  </div>
</template>

<script>
import UserPlaylist from '@/components/playlists/UserPlaylist.vue'


export default {
  name: 'UserPlaylists',
    components: {
      UserPlaylist,
  },
  
}
</script>

<style>

</style>