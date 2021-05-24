<template>
  <div id="UserPlaylistDetails">

    <!-- videoがあるとき -->
    <UserVideos :playlistId="id" v-if="$store.state.videos.length"/>

    <!-- videoがないとき -->
    <NoVideos :playlistId="id" v-else/>

    <!-- TODO: ソートの導入中止中 -->
    <!-- ソートがtrueのときのみ表示 -->
    <!-- <ButtonDoneSorting v-if="$store.state.sorting"/> -->
    
  </div>
</template>

<script>
import UserVideos from '@/components/videos/UserVideos.vue'
import NoVideos from '@/components/videos/NoVideos.vue'
// import ButtonDoneSorting from '@/components/tools/ButtonDoneSorting.vue'

export default {
  name: 'playlist',
  props:['id'],
  components: {
    UserVideos,
    NoVideos,
    // ButtonDoneSorting,
  },
}
</script>
