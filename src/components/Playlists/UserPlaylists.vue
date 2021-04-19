<template>
  <div>
    <h2>すべてのプレイリスト</h2>
    <v-list
    flat
    class="pt-0"
    >

    </v-list>
    <draggable
      v-model="playlists"
      handle=".handle"
    >
      <UserPlaylist
      v-for="playlist in playlists"
      :key="playlist.id"
      :playlist="playlist"
      />
   </draggable>
  </div>
</template>

<script>
import UserPlaylist from '@/components/playlists/UserPlaylist.vue'
import draggable from "vuedraggable";

export default {
  name: 'UserPlaylists',
    components: {
      UserPlaylist,
      draggable,
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