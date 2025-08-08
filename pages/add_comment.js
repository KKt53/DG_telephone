import { useState, useEffect, useContext } from 'react';
import Layout from '../components/layout';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  addDoc
} from 'firebase/firestore';
import '../components/fire'; // ← initializeApp のみ
import Link from 'next/link';
import AuthContext from '../contexts/AuthContext';

const auth = getAuth();
const db = getFirestore();

export default function Home() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('wait...');
  const [contents, setContents] = useState('');
  const [views, setViews] = useState(null);
  const [telephone_number, setTelephone_number] = useState('');
  const { email, setEmail } = useContext(AuthContext);
  const router = useRouter();

  const onChangeFind = (e) => {
    setContents(e.target.value);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        console.log("ログイン状態検出:", user.email);
        setEmail(user.email);
      }
    });

    const fetchData = async () => {
      const id = router.query.id;
      if (!id) {
        setMessage('電話番号なし');
        return;
      }

      setTelephone_number(id);
      setMessage('検索した電話番号：' + id);

      // コメント取得
      const commentsQuery = query(
        collection(db, 'コメント'),
        where('電話番号', '==', id)
      );
      const commentSnapshot = await getDocs(commentsQuery);
      const commentRows = [];
      commentSnapshot.forEach(doc => {
        const d = doc.data();
        commentRows.push(
          <tr key={doc.id}>
            <td>{d.内容}</td>
          </tr>
        );
      });
      setData(commentRows);

      // 閲覧回数取得 + 更新
      const telQuery = query(
        collection(db, '電話番号'),
        where('登録した電話番号', '==', id)
      );
      const telSnapshot = await getDocs(telQuery);
      if (!telSnapshot.empty) {
        const telDoc = telSnapshot.docs[0];
        const docRef = telDoc.ref;
        const telData = telDoc.data();
        const currentViews = telData.閲覧回数 || 0;
        setViews(currentViews + 1);
        await updateDoc(docRef, { 閲覧回数: currentViews + 1 });
      } else {
        setViews(1);
      }
    };

    fetchData();

    return () => unsubscribe();
  }, [router.query.id]);

  const doAction = async () => {
    if (!contents.trim()) {
      setMessage("コメントを入力してください");
      return;
    }

    if (!email.trim()) {
      setMessage("先にログインしてください");
      return;
    }

    const ob = {
      電話番号: telephone_number,
      内容: contents,
      email: email
    };

    try {
      const docRef = await addDoc(collection(db, 'コメント'), ob);
      setData(prevData => [
        ...prevData,
        <tr key={docRef.id}>
          <td>{ob.内容}</td>
        </tr>
      ]);
      setMessage("コメントを追加しました");
      setContents('');
    } catch (err) {
      setMessage("コメントの追加に失敗しました");
      console.error(err);
    }
  };

  return (
    <div>
      <Layout header="あやしい電話番号" title="コメント投稿ページ">
        <div className="text-right">
          <Link href=".">
            <button className="btn btn-primary form-text">トップ</button>
          </Link>
        </div>

        <h5 className="mb-4 text-center">
          {message}
          <div>説明：{router.query.desc}</div>
          <div>閲覧回数：{views} 回</div>
        </h5>

        <table className="table bg-white text-center">
          <thead>
            <tr>
              <th>コメント一覧</th>
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>

        {email && (
          <div className="alert alert-primary text-center">
            <div className="text-left">
              <div className="row g-3 align-items-center">
                <div className="col-auto">
                  <label>追加するコメント:</label>
                </div>
                <div className="col">
                  <input
                    type="text"
                    onChange={onChangeFind}
                    value={contents}
                    className="form-control"
                  />
                </div>
                <div className="col-auto">
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
  );
}
