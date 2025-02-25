import {useState, useEffect, useContext} from 'react';
import Layout from '../components/layout';
import firebase from 'firebase';
import { useRouter } from 'next/router';
import '../components/fire';
import Link from 'next/link';
import AuthContext from '../contexts/AuthContext';

const db = firebase.firestore();

export default function Add() {
  const [message_number, setMessage_number] = useState('');
  const [message_ex, setMessage_ex] = useState('');

  const [telephone_number, setTelephone_number] = useState('');
  const [explanation, setExplanation] = useState('');
  const router = useRouter();

  const { email, setEmail } = useContext(AuthContext);

  const onChangeTelephone_number = ((e)=> {
    setTelephone_number(e.target.value);
  })
  const onChangeMail = ((e)=> {
    setExplanation(e.target.value);
  })

  const doAction = (()=> {

    if(!telephone_number.trim()){
      setMessage_number("電話番号を入力してください");
      return;
    }
    else{
      setMessage_number("");
    }

    if(!explanation.trim()){
      setMessage_ex("説明欄を入力してください");
      return;
    }else{
      setMessage_ex("");
    }

    const ob = {
      登録した電話番号:telephone_number,
      説明:explanation,
      email:email
    }

    db.collection('電話番号').add(ob).then(ref=> {
      router.push('login');
    })
  })

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <div>
      <Layout header="あやしい電話番号" title="電話番号登録画面">
        <div class="text-right">
          <Link href="./login">
            <button className="btn btn-primary form-text">
              マイページ
            </button>
          </Link>
        </div>
      <div className="alert alert-primary text-center">
        <h5 className="mb-4">{message_number}</h5>
        <div className="text-left">
          <div className="form-group">
            <label>電話番号:</label>
            <input type="text" onChange={onChangeTelephone_number}
              className="form-control" />
              {email}
          </div>
        </div>
        <h5 className="mb-4">{message_ex}</h5>
        <div className="text-left">
          <div className="form-group">
            <label>説明欄:</label>
            <textarea  type="text" onChange={onChangeMail}
              className="form-control"  rows="3"/>
          </div>
        </div>
        <button onClick={doAction} className="btn btn-primary">
          Add
        </button>
      </div>
      </Layout>
    </div>
  )
}