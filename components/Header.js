import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import '../components/fire'; // initializeApp だけを呼んでる想定
import AuthContext from '../contexts/AuthContext';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// FirebaseLoginUI を SSR 無効で読み込む
const FirebaseLoginUI = dynamic(() => import('../components/FirebaseLoginUI'), {
  ssr: false,
});

const auth = getAuth();

export default function Header({ header }) {
  const { email, setEmail } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
      } else {
        setEmail('');
      }
    });

    return () => unsubscribe(); // クリーンアップ
  }, []);

  const clear_email = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setEmail('');
      router.replace('/');
    });
  };

  return (
    <div>
      <h1 className="bg-primary px-3 text-white text-center text-4xl md:text-2xl">
        {header}
      </h1>

      {!email ? (
        <div className="text-right">
          <Link href="./login">
            <button className="btn btn-primary">ログインページへ</button>
          </Link>
        </div>
      ) : (
        <div className="text-right">
          <p>Email: {email}</p>
          <button className="btn btn-primary" onClick={clear_email}>
            ログアウト
          </button>
        </div>
      )}
    </div>
  );
}
