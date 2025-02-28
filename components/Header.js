import { useState, useEffect, useContext } from 'react';
import firebase from 'firebase';
import '../components/fire';
import AuthContext from '../contexts/AuthContext';

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default function Header(props) {
  const { email, setEmail } = useContext(AuthContext);

  useEffect(() => {
    // 1. リダイレクト後の結果を取得
    firebase.auth().getRedirectResult()
      .then(result => {
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

    // 2. ログイン状態の変更を監視
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("ログイン状態検出:", user.email);
        setEmail(user.email);
      }
    });

    return () => unsubscribe(); // クリーンアップ
  }, []);

  // ログイン処理（リダイレクト）
  const handleLogin = () => {
    if (!firebase.auth().currentUser) { // すでにログインしている場合はリダイレクトしない
      firebase.auth().signInWithRedirect(provider);
    } else {
      console.log("すでにログイン済み:", firebase.auth().currentUser.email);
    }
  };

  // ログアウト処理
  const clear_email = () => {
    firebase.auth().signOut().then(() => {
      setEmail('');
    });
  };

  return (
    <div>
      <h1 className="bg-primary px-3 text-white display-4 text-right">
        {props.header}
      </h1>

      {!email ? (
        <button className="btn btn-primary" onClick={handleLogin}>
          Googleでログイン
        </button>
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