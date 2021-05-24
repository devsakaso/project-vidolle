<template>
  <div>
    <v-container px-4>
      <v-row
        align="center"
        justify="space-between"
        >
        <!-- 動画一覧の見出し -->
        <v-col cols="11">
         <h2 class="primary--text"><span v-if="$store.state.currentPlaylistTitle">{{$store.state.currentPlaylistTitle}}の</span>動画一覧</h2>
        </v-col>
        <!-- 動画追加のボタン -->
        <v-col cols="1">
         <FieldAddVideo :playlistId="playlistId"/>
        </v-col>
      </v-row>
    </v-container>
      <!-- 動画リスト -->
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
  // プレイリストのタイトルを取得
  mounted() {
    this.$store.commit('getPlaylistTitle', this.playlistId)
  }
}
</script>
