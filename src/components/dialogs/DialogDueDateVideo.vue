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
      <!-- キャンセルボタン -->
      <v-btn
        @click="$emit('close')"
        text
        color="primary"
      >
        キャンセル
      </v-btn>
      <!-- OKボタン -->
      <v-btn
        @click="saveVideo"
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
  // VideoMenu.vueから受け取る
  props: ['video'],
  data() {
    return {
      date: null
    }
  },
  // マウント時にvideoのdueDateをdatepickerのカレンダーに反映させる
  mounted() {
    if(this.video.dueDate) {
      this.date = this.video.dueDate
    }
  },
  methods: {
    saveVideo() {
      let payload = {
        playlistId: this.video.playlistId,
        videoId: this.video.videoId,
        dueDate: this.date
      }
      this.$store.dispatch('updateVideoDueDate', payload)
      this.$emit('close')
    }
  }
}
</script>
