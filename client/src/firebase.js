import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAp2Ae9dbi_-SZ5sUa3DFI3_0W7VJe4m7Y",
    authDomain: "mikes-recipes-80a96.firebaseapp.com",
    projectId: "mikes-recipes-80a96",
    storageBucket: "mikes-recipes-80a96.appspot.com",
    messagingSenderId: "149868240669",
    appId: "1:149868240669:web:1d02c9ddc6d9996bdfcbf4",
    measurementId: "G-4E3BZ5TZYB"
}

firebase.initializeApp(config)
export default firebase