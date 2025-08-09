import Layout from '../components/layout';
import 'firebase/firestore';
import '../components/fire';
import Link from 'next/link';

export default function HowToUse() {
  return (
    <div>
      <Layout header="あやしい電話番号" title="あやしい電話番号 / 使い方">
        <div class="text-right">
          <Link href=".">
            <button className="btn btn-primary form-text">
              トップ
            </button>
          </Link>
        </div>
        <main style={{ maxWidth: "640px", margin: "0 auto", padding: "2rem" }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "1rem" }}>
            本WEBアプリの使い方
          </h1>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
              電話番号の検索の仕方
            </h2>
            <ol style={{ paddingLeft: "1.2rem" }}>
              <li>このサイトの検索バーに電話番号を入力してください</li>
              <li>「検索」ボタンを押して検索してください</li>
              <li>検索して何も出なくて不安な場合は登録を推奨します</li>
            </ol>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
              電話番号の登録の仕方
            </h2>
            <ol style={{ paddingLeft: "1.2rem" }}>
              <li>右上の「ログインページへ」のボタンを押してください</li>
              <li>グーグルかメールアドレスでログイン、登録してない場合はそのまま登録できます</li>
              <li>ログインできるとマイページから遷移して「電話番号登録」ボタンを押せばそこから電話番号を登録することができます、説明欄にどんな会話だったか書く事を勧めます</li>
              <li>「登録した電話番号」一覧から登録した電話番号を消去することができます</li>
            </ol>
          </section>
        </main>
      </Layout>
    </div>
  );
}