<template>
  <v-row>

        <v-col cols="12" md="8">
      <v-card-text class="mt-6">
        <h1 class="text-center display-1 primary--text text--accent-3 mb-4">ログイン</h1>
        <div class="text-center">
          <v-btn class="mx-2" fab color="black" outlined>
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          <v-btn class="mx-2" fab color="black" outlined>
            <v-icon>mdi-google</v-icon>
          </v-btn>
          <v-btn class="mx-2" fab color="black" outlined>
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
        </div>
        <h2 class="text-center my-4 text-subtitle-1">お名前、メールアドレス、パスワード<br>を入力してスタートしましょう。</h2>
        <v-form ref="form" @submit.prevent="login">
          <v-text-field
          v-model="email"
          label="Eメールアドレス"
          prepend-icon="mdi-email"
          type="text"
          color="primary accent-3"
          >
          </v-text-field>
          <v-text-field
          v-model="password"
          label="パスワード"
          prepend-icon="mdi-lock"
          type="password"
          color="primary accent-3"
          >
          </v-text-field>
          <div class="text-center mt-3">
            <v-btn rounded color="primary accent-3" dark type="submit">ログイン</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-col>

    <v-col cals="12" md="4" class="primary accent-3 mx-3 mx-md-auto">
      <v-card-text class="white--text mt-3">
        <h5 class="text-center mt-2 text-subtitle-1">登録がまだの方はこちら</h5>
      </v-card-text>
      <div class="text-center mb-6">
        <v-btn rounded outlined dark @click="$store.state.step++">新規会員登録</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
// import { error, login, isPending } from '@/composables/useLogin'
import { projectAuth } from '@/firebase/config'

export default {
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
      // isPending: false,
    }
  },
  methods: {
    login() {
      if(this.email && this.password) {
        projectAuth.signInWithEmailAndPassword(this.email, this.password)
        .then(cred => {
          this.$store.commit('signIn', true)
          this.$store.commit('setUser', cred.user.uid)
          this.$router.push({ name: 'Playlists' })
        })
        .catch( err => {
          this.feedback = err.message
        })
        this.feedback = null
      } else {
        this.feedback = 'メールアドレスとパスワードを入力してください。'
      }
    }
  }
}
</script>
