import { getFirestore, collection, query, orderBy, startAt, endAt, getDocs } from 'firebase/firestore';
import { useState, useEffect, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import '../components/fire'; // initializeAppはここで行う想定
import Layout from '../components/layout';
import Link from 'next/link';
import AuthContext from '../contexts/AuthContext';

// Firestoreインスタンス取得
const db = getFirestore();

export default function Home() {
  const [data, setData] = useState([]);
  const [find, setFind] = useState('');
  const [message, setMessage] = useState('検索バーに電話番号を入力して「検索」ボタンを押して検索してください');
  const { email } = useContext(AuthContext);

  const onChangeFind = (e) => {
    setFind(e.target.value);
  };

  const doAction = async () => {
    if (!find.trim()) {
      setMessage('電話番号を入力してください');
      return;
    }

    try {
      const q = query(
        collection(db, '電話番号'),
        orderBy('登録した電話番号'),
        startAt(find),
        endAt(find + '\uf8ff')
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setMessage('安全な電話番号かもしれないけど気を付けて！　それでも怪しかったら登録を！');
        setData([]);
        return;
      }

      const mydata = snapshot.docs.map(doc => {
        const docData = doc.data();
        return (
          <tr key={doc.id}>
            <td>
              <a href={'./add_comment?id=' + encodeURIComponent(docData.登録した電話番号) + '&desc=' + encodeURIComponent(docData.説明)}>
                {docData.登録した電話番号}
              </a>
            </td>
          </tr>
        );
      });

      setData(mydata);
      setMessage('検索した電話番号: ' + find);
    } catch (error) {
      setMessage('エラーが発生しました: ' + error.message);
      setData([]);
    }
  };

  return (
    <div>
      <Layout header="あやしい電話番号" title="あやしい電話番号">
        {email && (
          <div className="text-right">
            <Link href="./mypage">
              <button className="btn btn-primary form-text">マイページ</button>
            </Link>
          </div>
        )}

        <div className="alert alert-primary text-center">
          <div className="text-left">
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label>電話番号:</label>
              </div>
              <div className="col">
                <input type="text" onChange={onChangeFind} className="form-control" />
              </div>
              <div className="col-auto">
                <button onClick={doAction} className="btn btn-primary form-text">
                  検索
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
          <tbody>{data}</tbody>
        </table>

        <div className="text-right">
          <Link href="./how-to-add">
            <button className="btn btn-primary form-text">サイトアイコンの設置の仕方</button>
          </Link>
        </div>
        <div className="text-right">
          <Link href="./how-to-use">
            <button className="btn btn-primary form-text">このWEBアプリの使い方</button>
          </Link>
        </div>
      </Layout>
    </div>
  );
}
