<template>
  <div>
    <v-card
    v-if="video.videoTitle"
    :class="{'primary lighten-3' : video.done}"
    class="white mx-auto my-12"
    :ripple="false"
    max-width="1200"
    >
      <v-container>
        <v-row no-gutters>

          <!-- イメージ画像 -->
          <v-col cols="12" sm="5" md="6">
            <!-- 埋め込みにする場合 -->
            <!-- <EmbedVideo
            :videoUrl="video.url"
            :height="315"
            /> -->
            <!-- v-if="$props.video.youtubeVideoId" -->
            <v-img
            :src="youtubeThumbnail"
            ></v-img>
            <!-- <div v-else class="no-images">
              <v-icon color="primary" size="100" class="no-videos">
                mdi-note-text-outline
              </v-icon>
            </div> -->
          </v-col>

          <!-- 動画詳細 -->
          <v-col cols="12" sm="6" class="d-flex flex-column justify-space-between align-start">
          <v-container fluid>
            <v-row no-gutters align="center" justify="space-between">
              <v-col cols="11">
              <!-- 動画リスト -->
              <v-card-title
              :class="{'text-decoration-line-through' : video.done}"
               class="primary--text"
              >
                  {{video.videoTitle}}
              </v-card-title>
              </v-col>
              <!-- プレイリスト操作メニュー -->
              <v-col cols="1">
                <v-card-actions>
                <VideoMenu
                  :videoUrl="video.url"
                  :video="video" />
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>

              <!-- 締切日 -->
              <v-chip
                v-if="video.dueDate"
                class="ma-2 ml-4"
                color="primary"
                label
                text-color="white"
              >
                <v-icon left small>
                  mdi-calendar-alert
                </v-icon>
                {{ video.dueDate | formattedDate }}
              </v-chip>

            <v-card-actions class="ma-2">
              <!-- ノートを作成するボタン -->
              <VideoAndNote
              :video="video"
              class="ml-0 mr-4"
              />
              <!-- ノートを見るボタン -->
              <v-btn
                @click="show = !show"
                class="primary"
              >
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                ノートを見る
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>

        <!-- ノートタイトルと内容を表示する部分 -->
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-card-title class="primary--text text-h6 font-weight-medium">
              ノート
            </v-card-title>
            <v-row
              no-gutters
              align="center"
              justify="space-between"
              class="flex-column"
            >
              <!-- ノートのタイトル -->
              <v-col>
                <v-chip
                  class="ma-2 ml-4"
                  color="primary"
                  outlined
                  text-color="primary"
                >
                  <v-icon left small>
                    mdi-format-title
                  </v-icon>
                    タイトル
                </v-chip>
                  {{video.noteTitle}}
              </v-col>
              <!-- ノートの内容 -->
              <v-col>
                <v-chip
                  class="ma-2 ml-4"
                  color="primary"
                  outlined
                  text-color="primary"
                >
                  <v-icon left small>
                    mdi-note-text-outline
                  </v-icon>
                    メモ内容
                </v-chip>
                  {{video.noteContent}}
              </v-col>
            </v-row>
          </div>
        </v-expand-transition>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { format } from 'date-fns'
import VideoMenu from './VideoMenu.vue'
// import EmbedVideo from './EmbedVideo.vue'
import VideoAndNote from './VideoAndNote.vue'

export default {
  name: 'UserVideo',
  components: {
    VideoMenu,
    // EmbedVideo,
    VideoAndNote,
  },
  props: ['video'],
  data() {
    return {
      show: false,
    }
  },
  filters: {
    formattedDate(value) {
      return format(new Date(value), 'M/dd')
    }
  },
  computed: {
    // youtubeのサムネイルを表示、画像がないときはno-imageの画像を表示
    youtubeThumbnail () {
      return this.$props.video.youtubeVideoId ? `https://img.youtube.com/vi/${this.$props.video.youtubeVideoId}/hqdefault.jpg` : require('@/assets/no-image.png')
    }
  }
}
</script>

<style lang="sass">
  .no-images
    height: 328px
    width: 480px
    // position: absolute
    // left: 50%
    // top: 50%
    // transform: translate(-50%, -50%)
    opacity: 0.5
</style>