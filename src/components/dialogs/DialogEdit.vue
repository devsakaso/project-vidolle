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
            v-model="playlistTitle"
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
            @click="savePlaylist"
            :disabled="playlistTitleInvalid"
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
  // PlaylistMenu.vueからplaylistを受け取る
  props: ['playlist'],
  data() {
    return {
      playlistTitle: null,
    }
  },
  computed: {
    playlistTitleInvalid() {
      // タイトルが空白 || 同じ（編集されていない）場合
      return !this.playlistTitle || this.playlistTitle === this.playlist.title
    }
  },
  // mount時にタイトルをplaylistTitleに格納することで表示できるようになる
  mounted() {
    this.playlistTitle = this.playlist.title
  },
  methods: {
    savePlaylist() {
      if(!this.playlistTitleInvalid) { //this忘れがち
          let payload = {
            id: this.playlist.id, //idは選択されたもの
          title: this.playlistTitle //titleは入力されたもの
        }
        this.$store.dispatch('updatePlaylistTitle', payload)
        this.$emit('close') //dialogを閉じる、親のPlaylistMenu.vueからemitされているcloseを使う
        // VuetifyのGoto()で常にトップにスクロールするように設定
        this.$vuetify.goTo(0, {duration: 0})
      }
    }
  }
}
</script>

