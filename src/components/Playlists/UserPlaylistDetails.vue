<template>
  <div class="UserVideoDetails">

    <FieldAddVideo/>
    <!-- videoがあるとき -->
    <UserVideos :playlistId="id" v-if="$store.state.videos.length"/>

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
  name: 'UserVideoDetails',
  components: {
    UserVideos,
    NoVideos,
    FieldAddVideo,
    ButtonDoneSorting,
  }
}
</script>
