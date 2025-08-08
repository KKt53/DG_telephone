// components/FirebaseLoginUI.js
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

const FirebaseLoginUI = () => {
  useEffect(() => {
    const auth = getAuth();

    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        // Googleログインを有効にする
        {
          provider: 'google.com',
        },
        // Email/Passwordログイン（任意）
        {
          provider: 'password',
        },
      ],
      signInFlow: 'popup',
      callbacks: {
        signInSuccessWithAuthResult: () => false, // 自動リダイレクトを防ぐ
      },
    });
  }, []);

  return <div id="firebaseui-auth-container" />;
};

export default FirebaseLoginUI;