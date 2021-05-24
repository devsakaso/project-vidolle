<template>
  <div>
    <v-list-item
    :class="{'blue lighten-5' : playlist.done}"
    class="white"
    :ripple="false"
    >
      <template v-slot:default>
        <!-- 完了をトグルするチェックボックス -->
        <v-list-item-action>
          <v-checkbox
            :input-value="playlist.done"
            @click="$store.dispatch('donePlaylist', playlist)"
          ></v-checkbox>
        </v-list-item-action>

        <!-- プレイリストタイトル -->
        <v-list-item-content>
          <!-- router-linkで個々のプレイリストへ移動 -->
          <router-link :to="{ name: 'playlist', params: { id: playlist.id } }" @click.native="$store.dispatch('getVideos', playlist.id)">
            <v-list-item-title
            :class="{'text-decoration-line-through' : playlist.done}"
            class="text-h6"
            >
              {{playlist.title}}
            </v-list-item-title>
          </router-link>
          <!-- プレイリストのメモ -->
          <v-list-item-subtitle
          :class="{'text-decoration-line-through' : playlist.done}"
          class="grey--text"
          >
          {{playlist.description}}
          </v-list-item-subtitle>
        </v-list-item-content>

        <!-- 締切日 -->
        <!-- v-if="playlist.dueDate"は、nullの場合は表示させないため。 -->
        <v-list-item-action v-if="playlist.dueDate">
          <v-list-item-action-text>
            <v-icon small>mdi-calendar</v-icon>
            {{ playlist.dueDate | formattedDate }}
          </v-list-item-action-text>
        </v-list-item-action>

          <!-- プレイリスト操作メニュー -->
          <v-list-item-action>
           <PlaylistMenu :playlist="playlist" />
          </v-list-item-action>
      </template>
    </v-list-item>
  </div>
</template>

<script>
import { format } from 'date-fns'
import PlaylistMenu from './PlaylistMenu.vue'

export default {
  name: 'UserPlaylist',
  components: {
    PlaylistMenu,
  },
  props: ['playlist'],
  filters: {
    // 日付をフォーマット
    formattedDate(value) {
      return format(new Date(value), 'M/dd')
    }
  }
}
</script>


<style lang="sass">
  .is-active
    background: red
</style>