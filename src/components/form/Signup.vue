<template>
  <v-row class="fill-height">
    <v-col cols="12" md="4" class="primary accent-3">
      <v-card-text class="white--text mt-12">
        <h4 class="text-center display-1 mb-4">おかえりなさい！</h4>
        <h5 class="text-center">登録済の方はこちら</h5>
      </v-card-text>
      <div class="text-center">
        <v-btn rounded outlined dark @click="$store.state.step--">ログイン</v-btn>
      </div>
    </v-col>
    <v-col cols="12" md="8">
      <v-card-text class="mt-12">
        <h1 class="text-center display-1 primary--text text--accent-3">新規登録はこちら</h1>
        <div class="text-center mt-4">
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
        <h4 class="text-center my-4">お名前、メールアドレス、パスワードを入力してスタートしましょう。</h4>
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
        <h4 v-if="feedback">{{feedback}}</h4>
    </v-col>
  </v-row>
</template>

<script>

import { db, projectAuth } from '@/firebase/config'

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
      console.log('サインアップクリック');
      if(this.email && this.password && this.displayName) {
        console.log('サインアップクリック');
          projectAuth.createUserWithEmailAndPassword(this.email, this.password)
          .then(cred => {
          //   // this.$store.commit('setUser', cred.user)
           db.collection('users').doc(cred.user.uid).set({
              displayName: this.displayName,
              email: this.email,
              userId: cred.user.uid //uidはcreateUserWithEmailAndPasswordで生成されるランダムid
            })
          })
          // .then(cred => {
            // cred.user.updateProfile({diplayName: this.displayName})
            // })
          .then(() => {
            this.$router.push({name: 'Playlists'})
          })
          .catch(err => {
            console.log(err);
            this.feedback = err.message
          })
          this.feedback = 'そのidは登録可能です'
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