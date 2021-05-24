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
      <v-col cols="1">
        <!-- プレイリスト追加のフィールド -->
        <FieldAddPlaylist/>
      </v-col>
    </v-row>
  </v-container>

  <!-- プレイリストないというメッセージ -->
  <div
  class="no-playlists"
  >
    <v-icon
    color="primary"
    size="100"
    class="no-playlists"
    >
      mdi-check
    </v-icon>
    <div class="text-h5 primary--text">
      プレイリストがありません
    </div>
  </div>
</div>
</template>

<script>
import FieldAddPlaylist from '@/components/playlists/FieldAddPlaylist.vue'

export default {
  name: 'NoPlaylists',
  components: {
    FieldAddPlaylist,
  }
}
</script>

<style lang="sass">
  .no-playlists
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    opacity: 0.5
</style>