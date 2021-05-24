<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <!-- ノートの作成ボタン -->
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
         <v-icon left small >mdi-note-plus-outline</v-icon> ノート作成
        </v-btn>
      </template>
      <!-- 動画とノート -->
      <v-card>
        <!-- ダイアログのヘッダー -->
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{video.videoTitle}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="dialog = false"
            >
              保存
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        
        <!-- 埋め込み動画 -->
        <EmbedVideo
        :video="video"
        :height="$vuetify.breakpoint.height - 300"
        />
        <v-divider></v-divider>
        <!-- ノート -->
        <v-subheader class="text-subtitle-1 primary--text text--accent-3 mx-md-10 mx-lg-auto my-lg-2 text-lg-h5">ノート</v-subheader>
        <!-- ノート入力部分 -->
        <FieldAddNote
        :video="video"
        @close="dialog = false"
        />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import EmbedVideo from '@/components/videos/EmbedVideo.vue'
import FieldAddNote from '@/components/videos/FieldAddNote.vue'
export default {
  name: 'note',
  props: ['video'],
  components: {
    FieldAddNote,
    EmbedVideo,
  },
  data () {
    return {
      dialog: false,
    }
  },
}
</script>