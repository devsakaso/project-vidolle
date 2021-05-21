<template>
  <div>
    <v-container px-4>
      <v-row
        align="center"
        justify="space-between"
        >
        
        <v-col cols="11">
         <h2 class="primary--text"><span v-if="$store.state.currentPlaylistTitle">{{$store.state.currentPlaylistTitle}}の</span>動画一覧</h2>
         <!-- <h2 class="primary--text">{{ playlistId}}の一覧</h2> -->
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
    // 検索結果の取得と表示
    videos: {
      get() {
        return this.$store.getters.videosFiltered
      },
      set(value) {
        this.$store.dispatch('setVideos', value)
      }
    }
  },
  data() {
    return {
      currentPlaylistTitle:'',
    }
  },

// TODO: リロード後にタイトルが消えるので、vuex-persistedstate使うか検討する
  // プレイリストのタイトル
  mounted() {
    this.$store.commit('getPlaylistTitle', this.playlistId)
  }
}
</script>

<style>

</style>