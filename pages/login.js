// pages/login.js
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import '../components/fire';
import AuthContext from '../contexts/AuthContext';

const FirebaseLoginUI = dynamic(() => import('../components/FirebaseLoginUI'), {
  ssr: false,
});

export default function LoginPage() {
  const { setEmail } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
        router.push('/'); // ログイン成功後にトップページへ戻る
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl mb-4">ログイン</h2>
      <FirebaseLoginUI />
    </div>
  );
}