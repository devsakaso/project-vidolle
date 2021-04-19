<template>
  <div>
    <v-text-field
    v-model="newVideoTitle"
    class="pa-3"
    outlined
    placeholder="動画名を入力"
    hide-details
    clearable
    >
    <template v-slot:append>
      <v-icon
      @click="addVideo"
      :disabled="newVideoTitleInvalid"
      >
        mdi-plus
      </v-icon>
    </template>

    </v-text-field>

  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      newVideoTitle: '',
    }
  },
  computed: {
    newVideoTitleInvalid() {
      return !this.newVideoTitle
    }
  },
  methods: {
    addVideo() {
      if(!this.newVideoTitleInvalid) {
        this.$store.dispatch('addVideo', this.newVideoTitle)
        this.newVideoTitle = ''
      }
    }
  }

}
</script>
