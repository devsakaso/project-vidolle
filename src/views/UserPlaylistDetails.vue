<template>
  <div id="UserPlaylistDetails">

    <!-- videoがあるとき -->
    <UserVideos :playlistId="id" v-if="$store.state.videos.length"/>

    <!-- videoがないとき -->
    <NoVideos :playlistId="id" v-else/>

    <!-- ソート終了ボタン -->
    <!-- ソートがtrueのときのみ表示 -->
    <ButtonDoneSorting v-if="$store.state.sorting"/>
    
  </div>
</template>

<script>
import UserVideos from '@/components/videos/UserVideos.vue'
import NoVideos from '@/components/videos/NoVideos.vue'
import ButtonDoneSorting from '@/components/tools/ButtonDoneSorting.vue'

export default {
  name: 'playlist',
  props:['id'],
  components: {
    UserVideos,
    NoVideos,
    ButtonDoneSorting,
  },
  // mounted() {
  //   // リロードされたときに再描画する(1がリロードの意味)
  //   if(performance.navigation.type === 1) {
  //     this.$props.id = this.$route.path.split('playlists/')[1]
  //     this.$store.dispatch('getVideos', this.$props.id)
  //   }
  // }
  // computed: {
    // プレイリストタイトルの取得
    // playlistTitle() {
    //    const playlist = this.$store.state.playlists.filter(playlist => playlist.id === this.$props.id)[0]
    //    return playlist.title
    // }
  // }
}
</script>
