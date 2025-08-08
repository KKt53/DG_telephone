import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCd_4OIkpeQpaJKHbYPaQyQ8ItjT4-SmmA",
  authDomain: "dgtelephone-aa990.firebaseapp.com",
  projectId: "dgtelephone-aa990",
  storageBucket: "dgtelephone-aa990.appspot.com",
  messagingSenderId: "302246333552",
  appId: "1:302246333552:web:0913ca35ca378d44b4b8b5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);