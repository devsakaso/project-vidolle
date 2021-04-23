<template>
  <div>
    <v-container px-4>
      <v-row
        align="center"
        justify="space-between"
        >
        
        <v-col cols="11">
         <h2 class="primary--text">{{ playlistTitle}}の一覧</h2>
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

      <UserVideo
      v-for="(video, i) in videos"
      :key="video[i]"
      :video="video"
      />
  </div>
</template>

<script>
import UserVideo from '@/components/videos/UserVideo.vue'
import FieldAddVideo from '@/components/videos/FieldAddVideo.vue'

export default {
  name: 'UserVideos',
  props: ['playlistId'],
  components: {
    UserVideo,
    FieldAddVideo,
  },
  computed: {
    videos: {
      get() {
        return this.$store.getters.videosFiltered
      },
      set(value) {
        this.$store.dispatch('setVideos', value)
      }
    },
    // プレイリストタイトルの取得
    playlistTitle() {
       const playlist = this.$store.state.playlists.filter(playlist => playlist.id === this.$props.playlistId)[0]
      //  console.log(playlist);
       return playlist.title
    }
  },
  
}
</script>

<style>

</style>