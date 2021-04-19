<template>
  <div
  class="no-videos"
  >
  <v-icon
  color="primary"
  size="100"
  class="no-videos"
  >
    mdi-check
  </v-icon>
  <div class="text-h5 primary--text">
    動画がありません
  </div>
  </div>
</template>

<script>
export default {
  name: 'NoVideos',
}
</script>

<style lang="sass">
  .no-videos
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    opacity: 0.5

</style>