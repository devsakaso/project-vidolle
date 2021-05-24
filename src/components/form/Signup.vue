<template>
  <v-row>
    <v-col cols="12" md="8">
      <v-card-text class="mt-6">
        <h1 class="text-center display-1 primary--text text--accent-3 mb-4">新規登録</h1>
        <!-- メール以外のログイン方法 -->
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
        <!-- アラート -->
        <v-alert
          dense
          elevation="2"
          type="error"
          v-if="feedback"
        >
          {{ feedback }}
        </v-alert>
        <!-- メールでのサインアップ -->
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

    <!-- 登録済の場合 -->
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
    // サインアップ
    signup() {
      if(this.email && this.password && this.displayName) {
          projectAuth.createUserWithEmailAndPassword(this.email, this.password)
          .then(cred => {
          //  ユーザー情報
           const newUser = {
              displayName: this.displayName,
              email: this.email,
              userId: cred.user.uid //uidはcreateUserWithEmailAndPasswordで生成されるランダムid
            }
            // ユーザーをデータベースに追加
            this.$store.dispatch('addUser', newUser)
            // データベースよりユーザー情報を取得
            this.$store.dispatch('getUser', newUser.userId)
          })
          .then(() => {
            // プレイリストページへ移動
            this.$router.push({name: 'Playlists'})
            // 認証状態を更新
            this.$store.commit('signIn', true)
          })
          .catch(err => {
            console.log(err);
            this.feedback = err.message
          })
      } else {
        this.feedback = '全ての項目を入力してください。'
      }
    }
  }
}
</script>


