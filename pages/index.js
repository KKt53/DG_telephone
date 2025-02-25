import { useState, useEffect, useContext  } from 'react';
import Layout from '../components/layout';
import firebase from 'firebase/app';
import 'firebase/firestore';
import '../components/fire';
import Link from 'next/link';
import AuthContext from '../contexts/AuthContext';

const db = firebase.firestore();

export default function Home() {
  const [data, setData] = useState([]);
  const [find, setFind] = useState('')
  const [message, setMessage] = useState('wait...');
  const { email, setEmail } = useContext(AuthContext);


  const onChangeFind = ((e)=> {
    setFind(e.target.value);
  })

 const doAction = (()=> {

  if (!find.trim()) {
    setMessage("電話番号を入力してください");
    return;
  }

  db.collection('電話番号').orderBy('登録した電話番号').startAt(find).endAt(find + '\uf8ff').get().then(snapshot=> {
      const mydata = [];
      snapshot.forEach((document)=> {
        const doc = document.data()
        mydata.push(
          <tr key={document.id}>
            <td><a href={'./add_comment?id=' + encodeURIComponent(doc.登録した電話番号) + '&desc=' + encodeURIComponent(doc.説明)}>{doc.登録した電話番号}</a></td>
          </tr>
        )
      })
      setData(mydata)
      setMessage("検索した電話番号: " + find)
    })
    .catch(error => {
      setMessage("エラーが発生しました: " + error.message);
    });
  })

  return (
    <div>
      
      <Layout header="あやしい電話番号" title="トップページ">
      <div class="text-right">
        <Link href="./login">
          <button className="btn btn-primary form-text">
            マイページ
          </button>
        </Link>
      </div>
      <div className="alert alert-primary text-center">
        <div className="text-left">
          <div className="row g-3 align-items-center">
            <div class="col-auto">
              <label >電話番号:</label>
            </div>
            <div class="col">
              <input type="text" onChange={onChangeFind}
                className="form-control" />
            </div>
            <div class="col-auto">
              <button onClick={doAction} className="btn btn-primary form-text">
                Find
              </button>
            </div>
          </div>
        </div>
      </div>
      <h5 className="mb-4 text-center">{message}</h5>
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
      </Layout>
    </div>
  )
}

