<template>
  <div>
    <v-list-item
    :class="{'blue lighten-5' : playlist.done}"
    class="white"
    :ripple="false"
    >
      <template v-slot:default>
        <!-- チェックボックス -->
        <v-list-item-action>
          <v-checkbox
            :input-value="playlist.done"
            @click="$store.dispatch('donePlaylist', playlist.id)"
            
            ></v-checkbox>
        </v-list-item-action>

        <!-- プレイリストタイトル -->
        <v-list-item-content>
          <v-list-item-title
          :class="{'text-decoration-line-through' : playlist.done}"
          >
            {{ playlist.title }}
            </v-list-item-title>
        </v-list-item-content>

        <!-- 締切日 -->
        <!-- v-if="playlist.dueDate"というのは、nullの場合は表示したくないので。 -->
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
import PlaylistMenu from './PlaylistMenu.vue'

export default {
  name: 'UserPlaylist',
  components: {
    PlaylistMenu
  },
  props: ['playlist'],
  filters: {
    formattedDate(value) {
      return format(new Date(value), 'M/dd')
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