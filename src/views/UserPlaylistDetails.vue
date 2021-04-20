<template>
  <div id="UserPlaylistDetails">

    <FieldAddVideo :id="id"/>
    <!-- videoがあるとき -->
    <UserVideos :id="id" v-if="$store.state.videos.length"/>

    <!-- videoがないとき -->
    <NoVideos v-else/>

    <!-- ソート終了ボタン -->
    <!-- ソートがtrueのときのみ表示 -->
    <ButtonDoneSorting v-if="$store.state.sorting"/>
    
  </div>
</template>

<script>
import UserVideos from '@/components/videos/UserVideos.vue'
import NoVideos from '@/components/videos/NoVideos.vue'
import FieldAddVideo from '@/components/videos/FieldAddVideo.vue'
import ButtonDoneSorting from '@/components/tools/ButtonDoneSorting.vue'

export default {
  name: 'UserPlaylistDetails',
  props:['id'],
  components: {
    UserVideos,
    NoVideos,
    FieldAddVideo,
    ButtonDoneSorting,
  },
  //   mounted() {
  //   this.$store.dispatch('getVideos', this.$props.id)
  // }
}
</script>
