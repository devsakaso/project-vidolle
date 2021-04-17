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
  </div>
</template>

<script>
export default {
  name: 'PlaylistMenu',
  props: ['playlist'],
  data() {
    return {
      items: [
        {
          title: '編集',
          icon: 'mdi-lead-pencil',
          click() {
            console.log('編集');
          }
        },
        {
          title: '締切日',
          icon: 'mdi-calendar-alert',
          click() {
            console.log('締切日');
          }
        },
        {
          title: '削除',
          icon: 'mdi-delete',
          click() {
            console.log('削除');
          }
        },
        {
          title: '並び替え',
          icon: 'mdi-drag-horizontal-veriant',
          click() {
            console.log('並び替え');
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