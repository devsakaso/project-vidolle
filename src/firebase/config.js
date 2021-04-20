import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: VUE_APP_API_KEY,
  authDomain: VUE_APP_AUTH_DOMAIN,
  projectId: VUE_APP_PROJECT_ID,
  storageBucket: VUE_APP_STORAGE_BUCKET,
  messagingSenderId: VUE_APP_MESSAGING_SENDER_ID,
  appId: VUE_APP_ID
};

// firebase初期化
firebase.initializeApp(firebaseConfig)
// サービス初期化
const projectAuth = firebase.auth()
const db = firebase.firestore()
// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { db, projectAuth, timestamp }

