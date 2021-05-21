<template>
  <v-row>


    <v-col cols="12" md="8">
      <v-card-text class="mt-6">
        <h1 class="text-center display-1 primary--text text--accent-3 mb-4">新規登録</h1>
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
        <v-alert
          dense
          elevation="2"
          type="error"
          v-if="feedback"
        >{{ feedback }}</v-alert>
        <v-form ref="form" @submit.prevent="signup">
          <v-text-field
          v-model="displayName"
          label="お名前"
          prepend-icon="mdi-human"
          type="text"
          color="primary accent-3"
          required
          >
          </v-text-field>
          <v-text-field
          v-model="email"
          label="Eメールアドレス"
          prepend-icon="mdi-email"
          type="text"
          color="primary accent-3"
          required
          >
          </v-text-field>
          <v-text-field
          v-model="password"
          label="パスワード"
          prepend-icon="mdi-lock"
          type="password"
          color="primary accent-3"
          required
          >
          </v-text-field>
          <div class="text-center my-5">
            <v-btn rounded color="primary accent-3" dark type="submit">無料で登録する</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-col>

    <v-col cals="12" md="4" class="primary accent-3 mx-3 mx-md-auto">
      <v-card-text class="white--text mt-3">
        <h5 class="text-center mt-2 text-subtitle-1">登録済の方はこちら</h5>
      </v-card-text>
      <div class="text-center mb-6">
        <v-btn rounded outlined dark @click="$store.state.step--">ログイン</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>

// import { db, projectAuth } from '@/firebase/config'
import { projectAuth } from '@/firebase/config'

export default {
  name: 'Signup',
  data() {
    return {
      displayName: null,
      email: null,
      password: null,
      feedback: null,
    }
  },
  methods: {
    signup() {
      if(this.email && this.password && this.displayName) {
          projectAuth.createUserWithEmailAndPassword(this.email, this.password)
          .then(cred => {

           const newUser = {
              displayName: this.displayName,
              email: this.email,
              userId: cred.user.uid //uidはcreateUserWithEmailAndPasswordで生成されるランダムid
            }
            this.$store.commit('signIn', true)
            this.$store.dispatch('addUser', newUser)
          })
          .then(() => {
            this.$router.push({name: 'Playlists'})
          })
          .catch(err => {
            console.log(err);
            this.feedback = err.message
          })
      } else {
        this.feedback = '全ての項目を入力してください。'
      }
    }
  },
  computed: {
    username() {
      return this.$store.getters.user
    },
    userStatus() {
      //return true in login state
      return this.$store.getters.isSignIn
    },
  },

}
</script>


