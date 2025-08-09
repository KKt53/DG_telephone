import {useState, useEffect} from 'react'
import Layout from '../components/layout'
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { useRouter } from 'next/router'
import '../components/fire'
import Link from 'next/link';

const db = getFirestore();

export default function Delete(props) {
  const [message, setMessage] = useState('wait.')
  const [data, setData] = useState(null)
  const router = useRouter()
    
  useEffect(() => {
    const fetchData = async () => {
      if (router.query.id) {
        setMessage('Delete id = ' + router.query.id);
        const docRef = doc(db, '電話番号', router.query.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          setMessage('データが存在しません。');
        }
      } else {
        setMessage((prevMessage) => prevMessage + '.');
      }
    };

    fetchData();
  }, [router.query.id]);

 const doAction = async (e) => {
    if (!router.query.id) return;
    const docRef = doc(db, '電話番号', router.query.id);
    await deleteDoc(docRef);
    router.push('mypage');
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