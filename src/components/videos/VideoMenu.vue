<template>
  <div>
    <v-menu
    bottom
    left
    >
      <!-- メニューボタン -->
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

      <!-- メニューアイテム -->
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
        done: false,
        edit: false,
        dueDate: false,
        delete: false
      },
      items: [
        {
          title: '完了',
          icon: 'mdi-check',
          click() {
            this.$store.dispatch('doneVideo', this.video)
          }
        },
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
        }
      ]
    }
    },
    methods: {
      // アイテム内のクリックハンドル
      handleClick(i) {
        this.items[i].click.call(this)
      }
    }
}
</script>