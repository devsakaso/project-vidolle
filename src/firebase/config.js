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
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

// サービス初期化
const projectAuth = firebase.auth()
const db = firebase.firestore()

// UserCollections
// const UserCollections = db.collection('users').where('user_id', '==', projectAuth.currentUser)

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { db, projectAuth, timestamp }