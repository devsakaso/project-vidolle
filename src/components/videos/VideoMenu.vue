<template>
  <div>
    <v-menu
    bottom
    left
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        color="primary"
        icon
        v-bind="attrs"
        v-on="on"
        >
          <v-icon>
            mdi-dots-vertical
          </v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
        v-for="(item, i) in items"
        :key="i"
        @click="handleClick(i)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- edit -->
    <DialogEditVideo
    v-if="dialogs.edit"
    :video="video"
    @close="dialogs.edit = false"
    />
    <!-- dueDate -->
    <DialogDueDateVideo
    v-if="dialogs.dueDate"
    :video="video"
    @close="dialogs.dueDate = false"
    />

    <!-- delete -->
    <DialogDeleteVideo
    v-if="dialogs.delete"
    :video="video"
    @close="dialogs.delete = false"
    />
  </div>
</template>

<script>
import DialogEditVideo from '@/components/dialogs/DialogEditVideo.vue'
import DialogDeleteVideo from '@/components/dialogs/DialogDeleteVideo.vue'
import DialogDueDateVideo from '@/components/dialogs/DialogDueDateVideo.vue'

export default {
  name: 'VideoMenu',
  props: ['video'], //UserPlyalist.vueから受け取る
  components: {
    DialogEditVideo,
    DialogDeleteVideo,
    DialogDueDateVideo,
  },
  data() {
    return {
      dialogs: {
        edit: false,
        dueDate: false,
        delete: false
      },
      items: [
        {
          title: '編集',
          icon: 'mdi-lead-pencil',
          click() {
            this.dialogs.edit = true
          }
        },
        {
          title: '締切日',
          icon: 'mdi-calendar-alert',
          click() {
            this.dialogs.dueDate = true
          }
        },
        {
          title: '削除',
          icon: 'mdi-delete',
          click() {
            this.dialogs.delete = true
          }
        },
        {
          title: '並び替え',
          icon: 'mdi-drag-horizontal-variant',
          click() {
            // 検索でワード絞ってからソートしたら絞った単語しか表示されなくなるので検索中のソートを禁止する
            if(!this.$store.state.search) {
              // クリックしてソートマークを出現させる
            this.$store.commit('toggleSorting')
            } else {
              this.$store.commit('showSnackbar', '検索を終了してから並び替えしてください。')
            }
          } 
        },
      ]
    }
    },
    methods: {
      handleClick(i) {
        this.items[i].click.call(this)
      }
    }
}
</script>

<style>

</style>