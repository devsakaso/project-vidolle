<template>
<div>
  <FieldAddVideo :playlistId="playlistId" class="mt-10"/>
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
  <div>

  </div>
</div>
</template>

<script>
import FieldAddVideo from '@/components/videos/FieldAddVideo.vue'

export default {
  name: 'NoVideos',
  props:['playlistId'],
   components:{
    FieldAddVideo,
  }
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