import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import firebase from 'firebase';
import '../components/fire';
import Link from 'next/link';
import AuthContext from '../contexts/AuthContext';

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default function Log_in() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('wait...');
  const { email, setEmail } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    let isPopupClosed = false;
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log("ログイン状態検出:", user.email);
        setEmail(user.email);
      }
      else{
        router.replace('/');
      }
    });

    fetchTelephoneData(email);
    setMessage("logined by " + email);
    // auth.signInWithPopup(provider)
    //   .then(result => {
    //     if (isPopupClosed) return; // ポップアップが閉じられていたら処理しない

    //     const userEmail = result.user.email;
    //     setMessage('logined: ' + result.user.displayName);
    //     setEmail(userEmail);
    //     localStorage.setItem('email', userEmail);
    //     // fetchTelephoneData(userEmail);
    //   })
    //   .catch(error => {
    //     console.error("ログインエラー:", error);

    //     if (error.code === 'auth/popup-closed-by-user') {
    //       isPopupClosed = true;
    //       router.replace('/'); // 即リダイレクト
    //     }
    //   });
    return () => unsubscribe();
  }, [email, setEmail]);

  const fetchTelephoneData = (email) => {
    if (!email) return;
    db.collection('電話番号').where('email', '==', email).get()
      .then(snapshot => {
        const mydata = snapshot.docs.map(document => {
          const doc = document.data();
          return (
            <tr key={document.id}>
              <td><a href={'./del?id=' + document.id}>{doc.登録した電話番号}</a></td>
            </tr>
          );
        });
        setData(mydata);
      })
      .catch(error => console.error("データ取得エラー:", error));
  };

  return (
    <div>
      <Layout header="あやしい電話番号" title="マイページ">
        <div className="text-right">
          <Link href=".">
            <button className="btn btn-primary form-text">
              トップ
            </button>
          </Link>
        </div>

        <div className="alert alert-primary text-center">
          <div className="g-3 align-items-center">
            <div className="col-auto">
              <h1 style={{ fontSize: "min(4vw, 1.5rem)" }}>
                {message}
              </h1>
            </div>
          </div>
        </div>

        <table className="table bg-white text-center">
          <thead>
            <tr>
              <th>登録した電話番号</th>
            </tr>
          </thead>
          <tbody>
            {data}
          </tbody>
        </table>

        <div className="text-left">
          <Link href="./add">
            <button className="btn btn-primary form-text">
              電話番号登録
            </button>
          </Link>
        </div>

      </Layout>
    </div>
  );
}
