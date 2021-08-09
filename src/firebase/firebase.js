import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAeKTmsMKrotnFXNj24h51gSKLRsibMy1Y",
  authDomain: "project-27176.firebaseapp.com",
  projectId: "project-27176",
  storageBucket: "project-27176.appspot.com",
  messagingSenderId: "974962107902",
  appId: "1:974962107902:web:9e308110dbb0e785ff0caf"
};

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

db.settings({ timestampsInSnapshots: true })

export default db