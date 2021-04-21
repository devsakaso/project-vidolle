<template>
  <v-dialog
      :value="true"
      persistent
      max-width="290"
    >

      <v-card>
        <v-card-title class="headline">
          削除しますか？
        </v-card-title>
        <v-card-text>タイトル: {{playlist.title}} を削除してよいですか？</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- DialogDelete.vueはTodo中でしか使わないのでstoreでDialogの状態管理をしない、
          そのため、Vuexを使っていてもグローバルで活用しないデータもある
          $emitしてPlaylist.vueに渡す -->
          <v-btn
            @click="$emit('close')"
            color="red"
            text
          >
            いいえ
          </v-btn>
          <!-- deletePlaylist()にplaylist.idを渡すことで削除できる -->
          <v-btn
            @click="$store.dispatch('deletePlaylist', playlist.id)"
            color="primary"
            text
          >
            はい
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  // Playlist.vueからplaylistを受け取る
  props: ['playlist']
}
</script>
