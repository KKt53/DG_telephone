import firebase from 'firebase/app';
import 'firebase/auth';  // ← 認証機能を追加
import 'firebase/firestore';

// Firebase 設定
const firebaseConfig = {
    apiKey: "AIzaSyCd_4OIkpeQpaJKHbYPaQyQ8ItjT4-SmmA",
    authDomain: "dgtelephone-aa990.firebaseapp.com",
    projectId: "dgtelephone-aa990",
    storageBucket: "dgtelephone-aa990.appspot.com",
    messagingSenderId: "302246333552",
    appId: "1:302246333552:web:0913ca35ca378d44b4b8b5"
};

// 初期化
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Firebase Authentication インスタンスをエクスポート
export const auth = firebase.auth();
export default firebase;
