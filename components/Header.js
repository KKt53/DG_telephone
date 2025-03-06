import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase';
import '../components/fire';
import AuthContext from '../contexts/AuthContext';

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default function Header(props) {
  const { email, setEmail } = useContext(AuthContext);
  const router = useRouter();

  //リダイレクト解決するまでそのまま
  useEffect(() => {

    console.log("useEffect発火", email);

    // const unsubscribe = auth.onAuthStateChanged(user => {
    //   if (user && !email) {
    //     console.log("ログイン状態を復元:", user.email);
    //     setEmail(user.email);
    //   }
    // });
    
    // 1. リダイレクト後の結果を取得
    // auth.getRedirectResult()
    //   .then(result => {
    //     if (result.user) {
    //       console.log("リダイレクトログイン成功:", result.user.email);
    //       setEmail(result.user.email);
    //     } else {
    //       console.log("リダイレクト後のユーザーなし");
    //     }
    //   })
    //   .catch(error => {
    //     console.error("リダイレクトログインエラー:", error);
    //   });

    // 2. ログイン状態の変更を監視
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log("ログイン状態検出:", user.email);
        setEmail(user.email);

      } else {
        console.log("ログアウト状態");
        setEmail('');

      }
    });

    return () => unsubscribe(); // クリーンアップ
  }, []);

  // ログイン処理（リダイレクト）
  const handleLogin = () => {
    if (!auth.currentUser) { // すでにログインしている場合はリダイレクトしない
      auth.signInWithPopup(provider).then(result => {
        if (result.user) {
          console.log("リダイレクトログイン成功:", result.user.email);
          setEmail(result.user.email);
        } else {
          console.log("リダイレクト後のユーザーなし");
        }
      })
      .catch(error => {
        console.error("リダイレクトログインエラー:", error);
      });
    } else {
      console.log("すでにログイン済み:", auth.currentUser.email);
      setEmail(auth.currentUser.email);
    }
  };

  // ログアウト処理
  const clear_email = () => {
    auth.signOut().then(() => {
      setEmail('');
      router.replace('/');
    });
  };

  return (
    <div>
      <h1 className="bg-primary px-3 text-white display-4 text-right">
        {props.header}
      </h1>

      {!email ? (
        <div className="text-right">
          <button className="btn btn-primary" onClick={handleLogin}>
            Googleでログイン
          </button>
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