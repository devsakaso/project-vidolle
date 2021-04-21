<template>
<div class="pa-4">
    <v-text-field
    v-model="keyword"
    class="mt-1 expanding-search"
    placeholder="検索キーワードを入力"
    filled
    clearable
    prepend-inner-icon="mdi-magnify"
  ></v-text-field>
  <v-btn
    elevation="2"
    color="primary"
    medium
    @click="searchVideo">
    検索する
    </v-btn>

    <!-- v-show="results" -->
  <v-card
    v-for="video in results" v-bind:key="video.id.videoId"
    class="mx-auto my-12"
    max-width="1200"
  >
  <v-container>
    <v-row no-gutters>
      <v-col
        cols="12"
        md="4"
      >
        <a
          :href="'https://www.youtube.com/watch?v=' + video.id.videoId"
          target="_blank"
          rel="noopener noreferrer">
          <v-img
            max-height="250"
            :src="video.snippet.thumbnails.medium.url"
          ></v-img>
        </a>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
      <v-card-title>{{ video.snippet.title }}</v-card-title>

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
          <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            channelTitle: {{ video.snippet.channelTitle}}
          </v-card-text>
          <v-card-text>
            channelId: {{ video.snippet.channelId}}
          </v-card-text>
          <v-card-text>
            publishTime: {{ video.snippet.publishTime}}
          </v-card-text>
          <v-text-field :value="video.snippet.title">
             {{ video.snippet.title }}
          </v-text-field>
          <v-text-field :value="video.id.videoId">
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
      console.log(video)
        const playlistId = this.$props.playlistId
        const videoId = null
        const newVideoTitle = video.snippet.title
        const url = 'https://www.youtube.com/watch?v=' + video.id.videoId
        console.log(playlistId, "id以外:", videoId, newVideoTitle, url,this.newVideoTitle,this.newVideoUrl);
        this.$store.dispatch('addVideoFromSearch', {playlistId, videoId, newVideoTitle, url})
        this.newVideoTitle = ''
        this.newVideoUrl = ''
    }
  }
};
</script>

