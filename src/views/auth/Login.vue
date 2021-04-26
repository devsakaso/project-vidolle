<template>
  <v-form
    ref="form"
    @submit.prevent="login"
  >
    <v-container>
      <v-row justify="center">
        <v-col
        align="center"
        cols="12"
        md="7"
        >
          <h2>Login</h2>
          <v-text-field
            v-model="email"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
        align="center"
        cols="12"
        md="7"
        >
          <v-text-field
            v-model="password"
            type="password"
            label="Password"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
        align="center"
        cols="12"
        md="7"
        >
          <!-- <button v-if="!isPending">Log in</button> -->
          <v-btn
            color="success"
            class="mr-4"
            type="submit"
          >
            ログイン
          </v-btn>

          <v-btn
            color="error"
            class="mr-4"
          >
            キャンセル
          </v-btn>
          <h4 v-if="feedback">{{feedback}}</h4>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
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

<style></style>
