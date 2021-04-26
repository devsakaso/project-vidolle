<template>
  <v-dialog
      :value="true"
      persistent
      max-width="290"
    >

      <v-card>
        <v-card-title class="headline">
          削除しますか？
        </v-card-title>
        <v-card-text>タイトル: {{video.videoTitle}} を削除してよいですか？</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- DialogDelete.vueはTodo中でしか使わないのでstoreでDialogの状態管理をしない、
          そのため、Vuexを使っていてもグローバルで活用しないデータもある
          $emitしてVideo.vueに渡す -->
          <v-btn
            @click="$emit('close')"
            color="red"
            text
          >
            いいえ
          </v-btn>
          <!-- playlistとvideoのidが必要なのでdeleteVideo()にvideoごと渡す -->
          <!-- TODO: videoが後続にまだあるとき、dialogが閉じないので、clickイベントを@とv-onで複数セットしたがもっといい方法を検討する -->
          <v-btn
            @click="$store.dispatch('deleteVideo', video)"
            v-on:click="$emit('close')"
            color="primary"
            text
          >
            はい
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  // Video.vueからvideoを受け取る
  props: ['video']
}
</script>
