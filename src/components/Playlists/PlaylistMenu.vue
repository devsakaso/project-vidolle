<template>
  <div>
    <v-menu
      bottom
      left
    >
      <!-- 3点ドットメニューボタン -->
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

      <!-- メニューボタン -->
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
    <DialogEdit
    v-if="dialogs.edit"
    :playlist="playlist"
    @close="dialogs.edit = false"
    />
    <!-- dueDate -->
    <DialogDueDate
    v-if="dialogs.dueDate"
    :playlist="playlist"
    @close="dialogs.dueDate = false"
    />

    <!-- delete -->
    <DialogDelete
    v-if="dialogs.delete"
    :playlist="playlist"
    @close="dialogs.delete = false"
    />
  </div>
</template>

<script>
import DialogEdit from '@/components/dialogs/DialogEdit.vue'
import DialogDelete from '@/components/dialogs/DialogDelete.vue'
import DialogDueDate from '@/components/dialogs/DialogDueDate.vue'

export default {
  name: 'PlaylistMenu',
  props: ['playlist'], //UserPlyalist.vueから受け取る
  components: {
    DialogEdit,
    DialogDelete,
    DialogDueDate,
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
        }
      ]
    }
    },
    methods: {
      // thisを束縛して実行
      handleClick(i) {
        this.items[i].click.call(this)
      }
    }
}
</script>