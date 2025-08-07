import {useState, useEffect} from 'react'
import Layout from '../components/layout'
import firebase from 'firebase'
import { useRouter } from 'next/router'
import '../components/fire'
import Link from 'next/link';

const db = firebase.firestore()

export default function Delete(props) {
  const [message, setMessage] = useState('wait.')
  const [data, setData] = useState(null)
  const router = useRouter()
    
  useEffect(() => {
    if (router.query.id) {
      setMessage('Delete id = ' + router.query.id);
      db.collection('電話番号').doc(router.query.id).get().then((ob) => {
        setData(ob.data());
      });
    } else {
      setMessage((prevMessage) => prevMessage + '.');
    }
  }, [router.query.id]);

 const doAction = (e)=> {
    db.collection('電話番号').doc(router.query.id)
        .delete().then(ref=> {
      router.push('login')
    })
  }

  return (
    <div>
      <Layout header="あやしい電話番号" title="あやしい電話番号 / 削除ページ">
        <div class="text-right">
          <Link href="./login">
            <button className="btn btn-primary form-text">
              マイページ
            </button>
          </Link>
        </div>
      <div className="alert alert-primary text-center">
        <h5 className="mb-4">{message}</h5>
        <pre className="card p-3 m-3 h5 text-left">
          email: {data != null ? data.email : '...'}<br/>
          登録した電話番号: {data != null ? data.登録した電話番号 : '...'}<br/>
          説明: {data != null ? data.説明 : '...'}
        </pre>
        <button onClick={doAction} className="btn btn-primary">
          Delete
        </button>
      </div>
      </Layout>
    </div>
  )
}