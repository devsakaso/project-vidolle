<template>
  <div>
  <h2>UserPlaylists</h2>
    <PlaylistVideos/>
    <VideoNotes/>
    <PlaylistMenu/>
  </div>
</template>

<script>
import PlaylistVideos from '@/components/playlists/PlaylistVideos.vue'
import VideoNotes from '@/components/playlists/VideoNotes.vue'
import PlaylistMenu from '@/components/playlists/PlaylistMenu.vue'

export default {
  name: 'UserPlaylists',
    components: {
      PlaylistVideos,
      VideoNotes,
      PlaylistMenu,
  }
}
</script>

<style>

</style>