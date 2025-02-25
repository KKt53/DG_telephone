import firebase from 'firebase/app';
import 'firebase/firestore';

// ☆各プロジェクトの設定を記述
const firebaseConfig = {
    apiKey: "AIzaSyCd_4OIkpeQpaJKHbYPaQyQ8ItjT4-SmmA",
    authDomain: "dgtelephone-aa990.firebaseapp.com",
    projectId: "dgtelephone-aa990",
    storageBucket: "dgtelephone-aa990.appspot.com",
    messagingSenderId: "302246333552",
    appId: "1:302246333552:web:0913ca35ca378d44b4b8b5"
}

if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig)
}