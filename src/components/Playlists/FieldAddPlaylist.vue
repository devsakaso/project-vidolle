<template>
  <div>
    <v-text-field
    v-model="newPlaylistTitle"
    class="pa-3"
    outlined
    placeholder="プレイリスト名を入力"
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

  </div>
</template>

<script>
export default {
  data() {
    return {
      newPlaylistTitle: '',
    }
  },
  computed: {
    newPlaylistTitleInvalid() {
      return !this.newPlaylistTitle
    }
  },
  methods: {
    addPlaylist() {
      if(!this.newPlaylistTitleInvalid) {
        this.$store.dispatch('addPlaylist', this.newPlaylistTitle)
        this.newPlaylistTitle = ''
      }
    }
  }

}
</script>
