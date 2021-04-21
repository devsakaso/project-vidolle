<template>
  <div>
    <h2>id: {{playlistId}}の動画一覧</h2>
    <v-list
    flat
    class="pt-0"
    >

    </v-list>
    <draggable
      v-model="videos"
      handle=".handle"
    >
      <UserVideo
      v-for="(video, i) in videos"
      :key="video[i]"
      :video="video"
      />
   </draggable>
  </div>
</template>

<script>
import UserVideo from '@/components/videos/UserVideo.vue'
import draggable from "vuedraggable";

export default {
  name: 'UserVideos',
  props: ['playlistId'],
  components: {
    UserVideo,
    draggable,
  },
  computed: {
    videos: {
      get() {
        return this.$store.getters.videosFiltered
      },
      set(value) {
        this.$store.dispatch('setVideos', value)
      }
    }
  },
  
}
</script>

<style>

</style>