<template>
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
</template>

<script>
export default {
  name: 'NoPlaylists',
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