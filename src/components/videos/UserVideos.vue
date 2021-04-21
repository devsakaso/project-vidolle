<template>
  <div>
    <v-container px-4>
      <v-row
        align="center"
        justify="start">
        <v-col cols="11">
         <h2 class="primary--text">id: {{playlistId}}の動画一覧</h2>
        </v-col>
        <v-col cols="1">
         <FieldAddVideo :playlistId="playlistId"/>
        </v-col>
      </v-row>
    </v-container>

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
import FieldAddVideo from '@/components/videos/FieldAddVideo.vue'

export default {
  name: 'UserVideos',
  props: ['playlistId'],
  components: {
    UserVideo,
    FieldAddVideo,
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