<template>
  <v-dialog
    ref="dialog"
    :value="true"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <v-date-picker
      v-model="date"
      scrollable
    >
      <v-spacer></v-spacer>
      <!-- dialogをclose -->
      <v-btn
        @click="$emit('close')"
        text
        color="primary"
      >
        キャンセル
      </v-btn>
      <!-- save -->
      <v-btn
        @click="savePlaylist"
        text
        color="primary"
      >
        OK
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  // PlaylistMenu.vueから受け取る
  props: ['playlist'],
  data() {
    return {
      date: null
    }
  },
  // マウント時にplaylistのdueDateをdatepickerのカレンダーに反映させる
  mounted() {
    if(this.playlist.dueDate) {
      this.date = this.playlist.dueDate
    }
  },
  methods: {
    savePlaylist() {
      let payload = {
        id: this.playlist.id,
        dueDate: this.date
      }
      this.$store.dispatch('updatePlaylistDueDate', payload)
      this.$emit('close')
    }
  }
}
</script>
