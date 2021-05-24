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
          <!-- キャンセルボタン -->
          <v-btn
            @click="$emit('close')"
            color="red"
            text
          >
            いいえ
          </v-btn>
          <!-- OKボタン -->
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
