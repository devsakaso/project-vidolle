<template>
  <div>
    <v-row justify="center">
    <!-- ダイアログ -->
    <v-dialog
      v-model="addVideoDialog"
      max-width="1200px"
    >
      <!-- ダイアログを開くボタン -->
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          small
          fab
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
      
      <!-- タブメニュー -->
      <v-card>
        <v-tabs
          v-model="tabs"
          background-color="primary accent-4"
          centered
          dark
          icons-and-text
        >
          <v-tabs-slider></v-tabs-slider>

          <v-tab>
            直接入力
            <v-icon>mdi-pencil</v-icon>
          </v-tab>

          <v-tab>
            検索する
            <v-icon>mdi-youtube</v-icon>
          </v-tab>

        </v-tabs>

        <!-- タブアイテム1 -->
        <v-tabs-items v-model="tabs">
          <v-tab-item>
            <v-card flat>
              <v-card-title>
                <span class="headline">新規動画登録</span>
              </v-card-title>
              <v-form @submit.prevent="addVideo">
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        v-model="newVideoTitle"
                        label="動画タイトル"
                        hide-details
                        clearable
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        v-model="newVideoUrl"
                        label="url"
                        hide-details
                        clearable
                        required
                      ></v-text-field>
                    </v-col>

                  </v-row>
                  <v-btn
                    class="mr-4 my-4"
                    type="submit"
                    :disabled="!newVideoTitle || !newVideoUrl"
                    color="primary darken-1"
                    @click="addVideoDialog = false"
                  >
                    登録
                  </v-btn>
                  <v-btn
                    class="mr-4 my-4"
                    color="red darken-1"
                    @click="cancelAddVideo"
                  >
                    キャンセル
                  </v-btn>
                </v-container>
              </v-form>
            </v-card>
          </v-tab-item>            
         
          <!-- タブアイテム2 -->
           <v-tab-item>
            <v-card flat>
              <v-card-title>
                <span class="headline">YouTube検索</span>
              </v-card-title>
              <SearchVideo
              :playlistId="playlistId"
              />
              </v-card>
            </v-tab-item>

        </v-tabs-items>
      </v-card>

    </v-dialog>
  </v-row>

  </div>
</template>

<script>
import SearchVideo from '@/components/videos/SearchVideo.vue'
export default {
  props: ['playlistId'],
  components: {
    SearchVideo,
  },
  data() {
    return {
      newVideoTitle: '',
      newVideoUrl: '',
      addVideoDialog: false,
      tabs: null,
    }
  },
  computed: {
    // 少なくともタイトルをいれないと登録できないようにする
    newVideoTitleInvalid() {
      return !this.newVideoTitle
    }
  },
  methods: {
    // 動画の追加
    addVideo() {
      if(!this.newVideoTitleInvalid) {
        const playlistId = this.$props.playlistId
        const videoId = null
        const newVideoTitle = this.newVideoTitle
        const url = this.newVideoUrl
        this.$store.dispatch('addVideo', {playlistId, videoId, newVideoTitle, url})
        this.newVideoTitle = ''
        this.newVideoUrl = ''
      }
    },
    // キャンセルボタン
    cancelAddVideo() {
      this.newVideoTitle = ''
      this.newVideoUrl = ''
      this.addVideoDialog = false
    }
  }
}
</script>
