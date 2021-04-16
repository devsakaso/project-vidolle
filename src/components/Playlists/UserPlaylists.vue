<template>
  <div>
  <h2>UserPlaylists</h2>
    <PlaylistVideos/>
    <VideoNotes/>
    <PlaylistMenu/>
  </div>
</template>

<script>
import PlaylistVideos from '@/components/Playlists/PlaylistVideos.vue'
import VideoNotes from '@/components/Playlists/VideoNotes.vue'
import PlaylistMenu from '@/components/Playlists/PlaylistMenu.vue'

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