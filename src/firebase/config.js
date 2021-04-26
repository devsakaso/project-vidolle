import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_ID
};

// firebase初期化
firebase.initializeApp(firebaseConfig)
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

// サービス初期化
const projectAuth = firebase.auth()
const db = firebase.firestore()

// UserCollections
// const UserCollections = db.collection('users').where('user_id', '==', projectAuth.currentUser)

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { db, projectAuth, timestamp }




//   //読み込み時に、firebase機能の設定をする
// const init = () => {
//     firebase.initializeApp(firebaseConfig);
//     firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
//   }

//   //emailとパスワードでログインする。
//   //firebase認証の結果、JWT Tokenが返ってくる。JWTは、localstrageに保存する。
//   //ここで、記載しているrouterは、vue-routerの機能で、'/'へルーティングしている
//  const signInWithEmailAndPassword = (email, password) => {
//     firebase.auth().signInWithEmailAndPassword(email, password)
//       .then(res => {
//         res.user.getIdToken().then(idToken => {
//           localStorage.setItem('jwt', idToken);
//           this.$router.push('/').catch(err => {
//             console.log("router push /", err);
//           });
//         })
//       }, err => {
//         console.log(err.message);
//       })
//   }
//   //emailとパスワードでアカウント作成する
//   //アカウント作成後は、'/signin'へルーティング
//  const signUpWithEmailAndPassword = (email, password) => {
//     firebase.auth().createUserWithEmailAndPassword(email, password)
//       .then(() => {
//         this.$router.push('/signin');
//       }).catch(err => {
//         console.log(err.message);
//       })
//   }
//   //ログアウト
//   //ログアウト後は、保存しているjwtを削除して、vuexのmutationに実装した状態の更新処理でユーザーをログアウト状態にする。
//  const logOut = () => {
//     firebase.auth().signOut()
//       .then(() => {
//         localStorage.removeItem("jwt")
//         this.$store.commit('onAuthEmailChanged', "");
//         this.$store.commit('onUserStatusChanged', false);
//       })
//       .catch((err) => {
//         console.log(`fail logout (${err}) `);
//       })
//   }
//   //状態管理
//   //jwtの状態、ユーザーの状態を更新する。
//  const onAuth = () => {
//     firebase.auth().onAuthStateChanged(user => {
//       if (user) {
//         if (user.ma) {
//           localStorage.setItem('jwt', user.ma)
//         } 
//         this.$store.commit('onAuthEmailChanged', user.email)
//         if (user.uid) {
//           this.$store.commit('onUserStatusChanged', true)
//         } else {
//           this.$store.commit('onUserStatusChanged', false)
//         }
//       } else {
//         this.$store.commit('onAuthEmailChanged', "")
//         this.$store.commit('onUserStatusChanged', false)
//       }
//     })
//   }


//   export {
//     init,
//     signInWithEmailAndPassword,
//     signUpWithEmailAndPassword,
//     logOut,
//     onAuth,
//   }