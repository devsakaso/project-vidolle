<template>
  <div>
    <!-- <v-text-field
    v-model="newVideoTitle"
    class="pa-3"
    outlined
    placeholder="動画名を入力"
    hide-details
    clearable
    >
    <template v-slot:append>
      <v-icon
      @click="addVideo()"
      :disabled="newVideoTitleInvalid"
      >
        mdi-plus
      </v-icon>
    </template>

    </v-text-field> -->


  <v-form @submit.prevent="addVideo">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="newVideoTitle"
            label="タイトル"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="url"
            label="url"
            required
          ></v-text-field>
        </v-col>

      </v-row>
      <v-btn
        class="mr-4"
        type="submit"
        :disabled="!newVideoTitle || !url"
      >
        登録
      </v-btn>
    </v-container>
  </v-form>

  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      newVideoTitle: '',
      url: '',
      // newVideo: {},
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
        const playlistId = this.$props.id
        const newVideoTitle = this.newVideoTitle
        const url = this.url
        this.$store.dispatch('addVideo', {playlistId, newVideoTitle, url})
        this.newVideoTitle = ''
        this.url = ''
      }
    }
  }

}
</script>
