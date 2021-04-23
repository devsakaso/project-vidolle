<template>
  <div>
    <v-card
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
                :input-value="video.done"
                @click="$store.dispatch('doneVideo', video)"
                
                ></v-checkbox>
            </v-card-actions>
          </v-col>
          <v-col
            cols="12"
            md="5"
          >
            <iframe
              width="100%"
              min-width="315"
              height="315"
              :src="embedable(video.url)"
              frameborder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
          </v-col>
          <v-col
            cols="12"
            md="5"
          >
            <!-- プレイリストタイトル -->
            <!-- <v-card-content> -->
              <!-- TODO: router-linkいれた、要確認 -->
              <!-- <router-link :to="{ name: 'UserVideoDetails', params: { id: video.id } }"> -->
              <v-card-title
              :class="{'text-decoration-line-through' : video.done,  'is-active' : activeVideo === video.title}"
              @click="setActiveVideo(video)"
               class="primary--text"
              >
                  title: {{video.title}}

              </v-card-title>
              <v-card-text>
                  url: {{video.url}}
                  <br>
                  videoId: {{video.videoId}}<br>
                  playlistId: {{ video.playlistId }}
                  <br>
                  done: {{video.done}}
                  <br>
                  timestamp: {{video.createdAt}}
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  dark
                >
                  ノートをみる
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                </v-btn>

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
            <VideoMenu :video="video" />
            </v-card-actions>
          </v-col>
          <v-col>

          </v-col>
        </v-row>
          <!-- 補足情報のチップ -->
          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

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
            </div>
          </v-expand-transition>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { format } from 'date-fns'
import VideoMenu from './VideoMenu.vue'
// import UserVideoDetails from './UserVideoDetails.vue'

export default {
  name: 'UserVideo',
  components: {
    VideoMenu,
    // UserVideoDetails,
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
  methods: {
    embedable (url) {
      // =以降がyoutubeの動画ID
      return `https://www.youtube.com/embed/${url.split('=')[1]}`
    },
    setActiveVideo(video) {
      this.activeVideo = video.title
      console.log(video.videoId)
    }
  }
}
</script>

