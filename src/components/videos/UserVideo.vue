<template>
  <div>
    <v-card
    v-if="video.title"
    :class="{'primary lighten-3' : video.done}"
    class="white mx-auto my-12"
    :ripple="false"
    max-width="1200"
    >
      <v-container>
        <v-row no-gutters>
          <v-col>
            <!-- チェックボックス -->
            <v-card-actions>
              <v-checkbox
                @click="$store.dispatch('doneVideo', video)"
                :input-value="video.done"
                ></v-checkbox>
            </v-card-actions>
          </v-col>
          <v-col
            cols="12"
            md="5"
          >
            <!-- <EmbedVideo
            :videoUrl="video.url"
            :height="315"
            /> -->
            <v-img
            :src="youtubeThumbnail"
            ></v-img>
          </v-col>
          <v-col
            cols="12"
            md="5"
          >
            <!-- 動画リスト -->
              <v-card-title
              :class="{'text-decoration-line-through' : video.done,  'is-active' : activeVideo === video.title}"
              @click="setActiveVideo(video)"
               class="primary--text"
              >
                  title: {{video.title}}

              </v-card-title>
              <v-card-text>
                  url: {{video.url}} <br>
                  youtubeID: {{video.youtubeVideoId}}
                  <br>
                  done: {{video.done}}
                <v-chip
                  class="ma-2"
                  color="primary"
                  label
                  small
                  text-color="white"
                >
                  <v-icon left>
                    mdi-format-title
                  </v-icon>
                  {{ video.title}}
                </v-chip>

                <v-chip
                  class="ma-2"
                  color="primary"
                  label
                  small
                  text-color="white"
                >
                  <v-icon left>
                    mdi-calendar-arrow-right
                  </v-icon>
                  
                </v-chip>


              </v-card-text>
              <v-card-actions>
                <UserVideoDetails
                :video="video"
                />

                <!-- 締切日 -->
                  <v-chip
                    v-if="video.dueDate"
                    class="ma-2"
                    color="primary"
                    label
                    text-color="white"
                  >
                    <v-icon left small>
                      mdi-calendar
                    </v-icon>
                    {{ video.dueDate | formattedDate }}
                  </v-chip>

                <v-spacer></v-spacer>

                <v-btn
                  icon
                  @click="show = !show"
                >
                  <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>


                <!-- </router-link> -->
            <!-- </v-card-content> -->
          </v-col>
          <v-col>

            <!-- プレイリスト操作メニュー -->
            <v-card-actions>
            <VideoMenu
             :videoUrl="video.url"
              :video="video" />
            </v-card-actions>
          </v-col>
          <v-col>

          </v-col>
        </v-row>
          <!-- 補足情報のチップ -->
          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

<h2>ノート </h2> 
                  noteTitle: {{video.noteTitle}}
                  <br>
                  noteContent: {{video.noteContent}}
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
import UserVideoDetails from './UserVideoDetails.vue'

export default {
  name: 'UserVideo',
  components: {
    VideoMenu,
    // EmbedVideo,
    UserVideoDetails,
  },
  props: ['video'],
  data() {
    return {
      activeVideo: '',
      show: false,
    }
  },
  filters: {
    formattedDate(value) {
      return format(new Date(value), 'M/dd')
    }
  },
  computed: {
    youtubeThumbnail () {
      return `http://img.youtube.com/vi/${this.$props.video.youtubeVideoId}/mqdefault.jpg`
    }
  },
    methods: {
    setActiveVideo(video) {
      this.activeVideo = video.title
      console.log(video.videoId)
    }
  }
}
</script>
