<template>
  <div>
    <v-container px-4>
      <v-row
        align="center"
        justify="space-between"
      >
        <v-col cols="11">
          <h2 class="primary--text my-4">すべてのプレイリスト</h2>
        </v-col>
        <!-- プレイリスト追加のフィールド -->
        <v-col cols="1">
          <FieldAddPlaylist/>
        </v-col>
      </v-row>
    </v-container>

    <!-- リスト -->
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
import FieldAddPlaylist from '@/components/playlists/FieldAddPlaylist.vue'
import UserPlaylist from '@/components/playlists/UserPlaylist.vue'

export default {
  name: 'UserPlaylists',
    components: {
      FieldAddPlaylist,
      UserPlaylist,
  },
  computed: {
    // 検索されたときのgetとset
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