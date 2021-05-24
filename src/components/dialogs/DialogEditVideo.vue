<template>
  <v-dialog
      :value="true"
      persistent
      max-width="290"
    >

      <v-card>
        <v-card-title class="headline">
          編集画面
        </v-card-title>
          <v-card-text>
            保存しますか？
            <v-text-field
            v-model="videoTitle"
            text
            ></v-text-field>
          </v-card-text>
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
            @click="saveVideo"
            :disabled="videoTitleInvalid"
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
  // VideoMenu.vueからvideoを受け取る
  props: ['video'],
  data() {
    return {
      videoTitle: null,
    }
  },
  computed: {
    videoTitleInvalid() {
      // タイトルが空白 || タイトルが同じ（編集されていない）場合
      return !this.videoTitle || this.videoTitle === this.video.videoTitle
    }
  },
  // mount時にタイトルをvideoTitleに格納することで表示できるようになる
  mounted() {
    this.videoTitle = this.video.videoTitle
  },
  methods: {
    saveVideo() {
      if(!this.videoTitleInvalid) {
          let payload = {
          playlistId: this.video.playlistId,
          videoId: this.video.videoId,
          videoTitle: this.videoTitle,
        }
        // console.log(payload);
        this.$store.dispatch('updateVideoTitle', payload)
        this.$emit('close')
        // VuetifyのGoto()で常にトップにスクロールするように設定
        this.$vuetify.goTo(0, {duration: 0})
      }
    }
  }
}
</script>

