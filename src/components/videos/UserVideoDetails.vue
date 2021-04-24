<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
         <v-icon>mdi-note</v-icon> ノート
        </v-btn>
      </template>
      <v-card>
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
          <v-toolbar-title>{{video.title}}</v-toolbar-title>
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
        
          <EmbedVideo
          :video="video"
          :height="$vuetify.breakpoint.height - 300"
          />
        <v-divider></v-divider>
          <v-subheader>ノート</v-subheader>
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