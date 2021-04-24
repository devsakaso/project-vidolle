<template>
  <div>
    <v-row
      width="100%"
      justify="center">
      <v-card flat>
        <v-form @submit.prevent="addNote">
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="noteTitle"
                  label="ノートタイトル"
                  hide-details
                  clearable
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
              >
                <v-textarea
                  v-model="noteContent"
                  label="内容"
                  hide-details
                ></v-textarea>
              </v-col>

            </v-row>
            <v-btn
              class="mr-4 my-4"
              type="submit"
              :disabled="!noteTitle && !noteContent"
              color="primary darken-1"
              @click="addNoteDialog = false"
            >
              登録
            </v-btn>
            <v-btn
              class="mr-4 my-4"
              color="red darken-1"
              @click="$emit('close')"
            >
              閉じる
            </v-btn>
          </v-container>
        </v-form>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ['video'],
  data() {
    return {
      noteTitle: this.$props.video.noteTitle ? this.$props.video.noteTitle : '',
      noteContent: this.$props.video.noteContent ? this.$props.video.noteContent : '',
      dialog: false,
    }
  },
  // computed: {
  //   setNoteTitle() {
  //     return this.noteTitle
  //   },
  //   setNoteContent() {
  //     return this.noteContent
  //   }
  // },
  methods: {
    // ノートの追加
    addNote() {
      if(!this.noteTitleInvalid) {
        const playlistId = this.$props.video.playlistId
        const videoId = this.$props.video.videoId
        const noteTitle = this.noteTitle
        const noteContent = this.noteContent
        this.$store.dispatch('addNote', {playlistId, videoId, noteTitle, noteContent})
      }
    },
    // キャンセルボタン
    closeAddNote() {
      this.$emit('close')
    }
  }
}
</script>
