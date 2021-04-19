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
        <v-card-text>タスク: {{video.title}} を削除してよいですか？</v-card-text>
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
          <!-- deleteVideo()にvideo.idを渡すことで削除できる -->
          <v-btn
            @click="$store.dispatch('deleteVideo', video.id)"
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
