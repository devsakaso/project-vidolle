<template>
  <div class="pa-4">
      <!-- 検索フィールド -->
      <v-text-field
      v-model="keyword"
      class="mt-1 expanding-search"
      placeholder="検索キーワードを入力"
      filled
      clearable
      prepend-inner-icon="mdi-magnify"
    ></v-text-field>
    <!-- 検索開始のボタン -->
    <v-btn
      elevation="2"
      color="primary"
      medium
      @click="searchVideo">
      検索する
      </v-btn>

    <!-- 検索結果 -->
    <v-card
      v-for="video in results" v-bind:key="video.id.videoId"
      class="mx-auto my-12"
      max-width="1200"
    >
      <v-container>
        <v-row no-gutters>
          <v-col
            cols="12"
            md="5"
          >
            <iframe
              width="100%"
              min-width="315"
              height="315"
              :src="`https://www.youtube.com/embed/${video.id.videoId}`"
              frameborder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-card-title class="primary--text">{{ video.snippet.title }}</v-card-title>
            <v-card-text>
              {{ video.snippet.description}}
            </v-card-text>
          </v-col>
        </v-row>
          <v-card-actions>
            <v-btn
              color="primary"
              dark
              @click="addVideo(video)"
            >
              保存する
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              icon
              @click="show = !show"
            >
              <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>

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
                {{ video.snippet.channelTitle}}
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
                {{ video.snippet.publishTime | formattedDate }}
              </v-chip>

              <!-- 情報取得用フィールド(タイトル) -->
              <v-text-field
                label="タイトル"
                class="d-none"
                :value="video.snippet.title">
                {{ video.snippet.title }}
              </v-text-field>
              <!-- 情報取得用フィールド(URL) -->
              <v-text-field
                label="動画ID"
                class="d-none"
                :value="video.id.videoId">
                https://www.youtube.com/watch?v={{video.id.videoId}}
              </v-text-field>
            </div>
          </v-expand-transition>
      </v-container>
    </v-card>

  </div>
</template>

<script>
import axios from 'axios';
import { format } from 'date-fns'

export default {
  name: "SearchVideo",
  props: ['playlistId'],
  data () {
    return {
      results: null,
      keyword: "",
      order: "viewCount", // リソースを再生回数の多い順に並べる
      params: {
        q: "", // 検索クエリを指定する
        part: "snippet",
        type: "video",
        maxResults: "3", // 最大検索数
        key: process.env.VUE_APP_YOUTUBE_KEY
      },
      show: false,
      newVideoTitle: '',
      newVideoUrl: '',
      youtubeVideoId: null,
    }
  },
  filters: {
    formattedDate(value) {
      return format(new Date(value), 'yyyy/M/dd')
    }
  },
  methods: {
    searchVideo () {
      this.params.q = this.keyword;
      axios
        .get("https://www.googleapis.com/youtube/v3/search", {
          params: this.params
        })
        .then( res => {
          this.results = res.data.items;
          // this.results.forEach(video => {
          //   this.newVideoTitle = video.snippet.title
          //   this.newVideoUrl = 'https://www.youtube.com/watch?v=' + video.id.videoId
          //   console.log(this.newVideoTitle, this.newVideoUrl);
          // })
        })
    },
    addVideo(video) {
        const youtubeVideoId = video.id.videoId
        const playlistId = this.$props.playlistId
        const videoId = null
        const newVideoTitle = video.snippet.title
        const url = 'https://www.youtube.com/watch?v=' + video.id.videoId
        
        this.$store.dispatch('addVideo', {youtubeVideoId, playlistId, videoId, newVideoTitle, url})
        this.newVideoTitle = ''
        this.newVideoUrl = ''
    }
  }
};
</script>

