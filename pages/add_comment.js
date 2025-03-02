import { useState, useEffect, useContext } from 'react';
import Layout from '../components/layout';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useRouter } from 'next/router';
import '../components/fire';
import Link from 'next/link';
import AuthContext from '../contexts/AuthContext';

const db = firebase.firestore();
const auth = firebase.auth();

export default function Home() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('wait...');
  const mydata = [];
  const router = useRouter();
  const [contents, setContens] = useState('');
  const [telephone_number, setTelephone_number] = useState('');
  const { email, setEmail } = useContext(AuthContext);
  const { desc } = router.query;

  const onChangeFind = ((e)=> {
    setContens(e.target.value)
  })

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log("ログイン状態検出:", user.email);
        setEmail(user.email);
      }
    });
    if (router.query.id) {

        setTelephone_number(router.query.id);
        setMessage('検索した電話番号：' + router.query.id);
        db.collection('コメント').where('電話番号', '==', router.query.id).get().then(snapshot=> {
            snapshot.forEach((document)=> {
                const doc = document.data()
                
                mydata.push(
                <tr key={document.id}>
                    <td>{doc.内容}</td>
                </tr>
                )
            })
            setData(mydata);
        });
    } else {
    setMessage('電話番号なし');
    }
    return () => unsubscribe();
  }, [router.query.id]);

  const doAction = (()=> {
    
    if(!contents.trim()){
      setMessage("コメントを入力してください");
      return;
    }
    else{
      setMessage("");
    }

    if(!email.trim()){
      setMessage("先にログインしてください");
      return;
    }
    else{
      setMessage("");
    }

    const ob = {
      電話番号:telephone_number,
      内容:contents,
      email:email
    }
    db.collection('コメント').add(ob).then(ref=> {
      setData(prevData => [
        ...prevData,
        <tr key={ref.id}>
          <td>{ob.内容}</td>
        </tr>
      ]);
    });
  });

  return (
    <div>
      
      <Layout header="あやしい電話番号" title="コメント投稿ページ">
      <div class="text-right">
        <Link href=".">
          <button className="btn btn-primary form-text">
            トップ
          </button>
        </Link>
      </div>
      
      <h5 className="mb-4 text-center">{message}
        <div>説明：{router.query.desc}
          </div>
        </h5>
      <table className="table bg-white text-center">
        <thead>
          <tr>
              <th>コメント一覧</th>
          </tr>
        </thead>
        <tbody>
          {data}
        </tbody>
      </table>
      {email && (
      <div className="alert alert-primary text-center">
        <div className="text-left">
          <div className="row g-3 align-items-center">
            <div class="col-auto">
              <label >追加するコメント:</label>
            </div>
            <div class="col">
              <input type="text" onChange={onChangeFind}
                className="form-control" />
            </div>
            <div class="col-auto">
            <button onClick={doAction} className="btn btn-primary">
              Add
            </button>
            </div>
          </div>
        </div>
      </div>
      )}
      </Layout>
    </div>
  )

}

