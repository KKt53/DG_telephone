import { useState, useEffect, useContext } from 'react';
import Layout from '../components/layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AuthContext from '../contexts/AuthContext';

import { db } from '../components/fire';
import { collection, addDoc } from 'firebase/firestore'; // ← 必要なモジュールを追加

export default function Add() {
  const [message_number, setMessage_number] = useState('');
  const [message_ex, setMessage_ex] = useState('');
  const [telephone_number, setTelephone_number] = useState('');
  const [explanation, setExplanation] = useState('');
  const router = useRouter();
  const { email, setEmail } = useContext(AuthContext);

  const onChangeTelephone_number = (e) => {
    setTelephone_number(e.target.value);
  };

  const onChangeMail = (e) => {
    setExplanation(e.target.value);
  };

  const doAction = async () => {
    if (!telephone_number.trim()) {
      setMessage_number('電話番号を入力してください');
      return;
    } else {
      setMessage_number('');
    }

    if (!explanation.trim()) {
      setMessage_ex('説明欄を入力してください');
      return;
    } else {
      setMessage_ex('');
    }

    const ob = {
      登録した電話番号: telephone_number,
      説明: explanation,
      email: email,
    };

    try {
      const colRef = collection(db, '電話番号');
      await addDoc(colRef, ob);
      router.push('mypage');
    } catch (error) {
      console.error("追加エラー:", error);
    }
  };

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <div>
      <Layout header="あやしい電話番号" title="あやしい電話番号 / 電話番号登録画面">
        <div className="text-right">
          <Link href="./login">
            <button className="btn btn-primary form-text">マイページ</button>
          </Link>
        </div>
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message_number}</h5>
          <div className="text-left">
            <div className="form-group">
              <label>電話番号:</label>
              <input type="text" onChange={onChangeTelephone_number} className="form-control" />
              {email}
            </div>
          </div>
          <h5 className="mb-4">{message_ex}</h5>
          <div className="text-left">
            <div className="form-group">
              <label>説明欄:</label>
              <textarea onChange={onChangeMail} className="form-control" rows="3" />
            </div>
          </div>
          <button onClick={doAction} className="btn btn-primary">
            Add
          </button>
        </div>
      </Layout>
    </div>
  );
}
