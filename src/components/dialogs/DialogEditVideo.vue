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
            v-model="title"
            text
          ></v-text-field>
            <v-text-field
            v-model="url"
            text
          ></v-text-field>
          </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="$emit('close')"
            color="red"
            text
          >
            いいえ
          </v-btn>

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
      title: null,
      url: null,
    }
  },
  computed: {
    videoTitleInvalid() {
      // タイトルが空白||urlが空白 || タイトルとurlのどちらかが同じ（編集されていない）場合
      return !this.title || !this.url || this.title === this.video.title && this.url === this.video.url
    }
  },
  // mount時にタイトルをvideoTitle,urlに格納することで表示できるようになる
  mounted() {
    this.title = this.video.title
    this.url = this.video.url
  },
  methods: {
    saveVideo() {
      if(!this.videoTitleInvalid) { //this忘れがち
          let payload = {
          playlistId: this.video.playlistId,
          videoId: this.video.videoId, //idは選択されたもの
          title: this.title, //titleは入力されたもの
          url: this.url //urlは入力されたもの
        }
        console.log(payload);
        this.$store.dispatch('updateVideoTitle', payload)
        this.$emit('close') //dialogを閉じる、親のVideoMenu.vueからemitされているcloseを使う
        // VuetifyのGoto()で常にトップにスクロールするように設定
        this.$vuetify.goTo(0, {duration: 0})
      }
    }
  }
}
</script>

