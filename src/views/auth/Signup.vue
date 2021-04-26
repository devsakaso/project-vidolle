<template>
  <v-form
    ref="form"
    @submit.prevent="signup"
  >
    <v-container>
      <v-row justify="center">
        <v-col
        align="center"
        cols="12"
        md="7"
        >
          <h2>新規登録</h2>
          <v-text-field
            v-model="displayName"
            label="名前"
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
          <v-text-field
            type="text"
            v-model="alias"
            label="alias"
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
          <!-- <div class="error" v-if="error">{{ error }}</div> -->
          <!-- <button v-if="!isPending">Log in</button> -->
          <v-btn
            color="success"
            class="mr-4"
            type="submit"
          >
            登録
          </v-btn>

          <v-btn
            color="error"
            class="mr-4"
          >
            <!-- @click="reset" -->
            キャンセル
          </v-btn>
          <h4 v-if="feedback">{{feedback}}</h4>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
// import useSignup from '@/composables/useSignup'
// import { projectAuth } from '@/firebase/config'
import { db, projectAuth } from '@/firebase/config'
// import Firebase from '@/firebase/config'
// import slugify from 'slugify'

export default {
  name: 'Signup',
  data() {
    return {
      displayName: null,
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null
      // isPending: false,
    }
  },
  methods: {
    // signup() {
    //   if(this.alias && this.email && this.password && this.displayName) {
    //     this.slug = slugify(this.alias, {
    //       replacement: '-',
    //       remove: /[$*_+~.()'"!\-:@]/g,
    //       lower: true
    //     })
    //     let ref = db.collection('playlists').doc(this.slug)
    //     ref.get().then( doc => {
    //       if(doc.exists) {
    //         this.feedback = 'そのidはすでに登録されています'
    //       } else {
    //       projectAuth.createUserWithEmailAndPassword(this.email, this.password)
    //       .then(cred => {
    //         // this.$store.commit('setUser', cred.user)
    //         ref.set({
    //           displayName: this.displayName,
    //           // alias: this.alias,
    //           alias: cred.user.uid,
    //           user_id: cred.user.uid //uidはcreateUserWithEmailAndPasswordで生成されるランダムid
    //         })
    //       })
    //       .then(() => {
    //         this.$router.push({name: 'Playlists'})
    //       })
    //       .catch(err => {
    //         console.log(err);
    //         this.feedback = err.message
    //       })
    //       this.feedback = 'そのidは登録可能です'
    //       }
    //     }) 
    //   } else {
    //     this.feedback = '全ての項目を入力してください。'
    //   }
    // }


    signup() {
      if(this.email && this.password && this.displayName) {
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