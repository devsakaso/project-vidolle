<template>
  <div>
    <v-row justify="center">
    <!-- ダイアログ -->
    <v-dialog
      v-model="addPlaylistDialog"
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

      <!-- ダイアログの入力部分 -->
      <v-card flat>
        <v-card-title>
          <span class="headline">新規プレイリスト登録</span>
        </v-card-title>
        <v-form @submit.prevent="addPlaylist">
          <v-text-field
            v-model="newPlaylistTitle"
            class="pa-3"
            outlined
            placeholder="プレイリスト名を入力"
            label="プレイリスト名"
            hide-details
            clearable
            >
            <template v-slot:append>
              <v-icon
              @click="addPlaylist"
              :disabled="newPlaylistTitleInvalid"
              >
                mdi-plus
              </v-icon>
            </template>
          </v-text-field>
          <v-text-field
            v-model="newPlaylistDescription"
            class="pa-3"
            outlined
            placeholder="プレイリストのメモを入力"
            label="プレイリストメモ"
            hide-details
            clearable
            >
            <template v-slot:append>
              <v-icon
              @click="addPlaylist"
              :disabled="newPlaylistTitleInvalid"
              >
                mdi-plus
              </v-icon>
            </template>
          </v-text-field>

          <v-btn
            class="mr-4 my-4"
            type="submit"
            :disabled="!newPlaylistTitle"
            color="primary darken-1"
            @click="addPlaylistDialog = false"
          >
            登録
          </v-btn>
          <v-btn
            class="mr-4 my-4"
            color="red darken-1"
            @click="cancelAddPlaylist"
          >
            キャンセル
          </v-btn>

        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPlaylistTitle: '',
      newPlaylistDescription: '',
      addPlaylistDialog: false,
    }
  },
  computed: {
    // 少なくともタイトルをいれないと登録できないようにする
    newPlaylistTitleInvalid() {
      return !this.newPlaylistTitle
    }
  },
  methods: {
    // プレイリストの追加
    addPlaylist() {
      if(!this.newPlaylistTitleInvalid) {
        const playlistTitle = this.newPlaylistTitle
        const playlistDescription = this.newPlaylistDescription
        this.$store.dispatch('addPlaylist', {playlistTitle, playlistDescription})
        this.newPlaylistTitle = ''
        this.newPlaylistDescription = ''
      }
    },
    // キャンセルボタン
    cancelAddPlaylist() {
      this.newPlaylistTitle = ''
      this.newPlaylistDescription = ''
      this.addPlaylistDialog = false
    }
  }
}
</script>
