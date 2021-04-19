<template>
  <div>
    <v-list-item
    :class="{'blue lighten-5' : video.done}"
    class="white"
    :ripple="false"
    >
      <template v-slot:default>
        <!-- チェックボックス -->
        <v-list-item-action>
          <v-checkbox
            :input-value="video.done"
            @click="$store.dispatch('doneVideo', video.id)"
            
            ></v-checkbox>
        </v-list-item-action>

        <!-- プレイリストタイトル -->
        <v-list-item-content>
          <!-- TODO: router-linkいれた、要確認 -->
          <!-- <router-link :to="{ name: 'UserVideoDetails', params: { id: video.id } }"> -->
          <v-list-item-title
          :class="{'text-decoration-line-through' : video.done,  'is-active' : activeVideo === video.title}"
          @click="setActiveVideo(video)"
          >
              title: {{video.title}}
              <br>
              url: {{video.url}}
            </v-list-item-title>
            <!-- </router-link> -->
        </v-list-item-content>

        <!-- 締切日 -->
        <!-- v-if="video.dueDate"というのは、nullの場合は表示したくないので。 -->
        <v-list-item-action v-if="video.dueDate">
          <v-list-item-action-text>
            <v-icon small>mdi-calendar</v-icon>
            {{ video.dueDate | formattedDate }}
          </v-list-item-action-text>
        </v-list-item-action>

          <!-- プレイリスト操作メニュー -->
          <v-list-item-action>
           <VideoMenu :video="video" />
          </v-list-item-action>

        <!-- ドラッグ -->
        <v-list-item-action
        v-if="$store.state.sorting"
        >
          <v-btn
            color="primary"
            class="handle"
            icon
          >
            <v-icon>mdi-drag-horizontal-variant</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
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
    }
  },
  filters: {
    formattedDate(value) {
      return format(new Date(value), 'M/dd')
    }
  },
  methods: {
    setActiveVideo(video) {
      this.activeVideo = video.title
      console.log(video.id)
    }
  }
}
</script>


<style lang="sass">
  .sortable-ghost
    opacity: 0
  .sortable-drag
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3)
</style>