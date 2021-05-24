<template>
  <v-container px-4>
    <v-row align="center" justify="space-between">
      <!-- タイトル -->
      <v-col cols="11">
        <h2 class="primary--text"><span v-if="$store.state.currentPlaylistTitle">
          {{$store.state.currentPlaylistTitle}}の</span>動画一覧
        </h2>
      </v-col>
    </v-row>
    
    <!-- 動画追加のボタン -->
    <FieldAddVideo :playlistId="playlistId" class="mt-10"/>

    <!-- メッセージ -->
    <div class="no-videos" >
      <v-icon color="primary" size="100" class="no-videos">
        mdi-check
      </v-icon>
      <div class="text-h5 primary--text">
        動画がありません
      </div>
    </div>
  </v-container>
</template>

<script>
import FieldAddVideo from '@/components/videos/FieldAddVideo.vue'

export default {
  name: 'NoVideos',
  props:['playlistId'],
   components:{
    FieldAddVideo,
  },
  // プレイリストのタイトルをセット
  mounted() {
    this.$store.commit('getPlaylistTitle', this.playlistId)
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