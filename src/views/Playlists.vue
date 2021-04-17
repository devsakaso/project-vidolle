<template>
  <div class="home">

    <!-- playlistがあるとき -->
    <UserPlaylists v-if="$store.state.playlists.length"/>

    <!-- playlistがないとき -->
    <NoPlaylists v-else/>

    <!-- ソート終了ボタン -->
    <!-- ソートがtrueのときのみ表示 -->
    <ButtonDoneSorting v-if="$store.state.sorting"/>
    
  </div>
</template>

<script>
import UserPlaylists from '@/components/playlists/UserPlaylists.vue'
import NoPlaylists from '@/components/playlists/NoPlaylists.vue'
import ButtonDoneSorting from '@/components/tools/ButtonDoneSorting.vue'

export default {
  name: 'Playlists',
  components: {
    UserPlaylists,
    NoPlaylists,
    ButtonDoneSorting,
  }
}
</script>
