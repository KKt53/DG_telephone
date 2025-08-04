// pages/how-to-add.js

import { useState, useEffect, useContext } from 'react';
import Layout from '../components/layout';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useRouter } from 'next/router';
import '../components/fire';
import Link from 'next/link';
import AuthContext from '../contexts/AuthContext';

export default function HowToAdd() {
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
        <main style={{ maxWidth: "640px", margin: "0 auto", padding: "2rem" }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "1rem" }}>
            スマホのホーム画面に追加する方法
          </h1>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
              📱 Android（Chrome）
            </h2>
            <ol style={{ paddingLeft: "1.2rem" }}>
              <li>このサイトをChromeで開きます</li>
              <li>右上の「︙（メニュー）」をタップ</li>
              <li>「ホーム画面に追加」を選択</li>
              <li>名前を確認して「追加」をタップ</li>
            </ol>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
              🍎 iPhone（Safari）
            </h2>
            <ol style={{ paddingLeft: "1.2rem" }}>
              <li>このサイトをSafariで開きます</li>
              <li>画面下の共有ボタン（□に↑）をタップ</li>
              <li>「ホーム画面に追加」を選択</li>
              <li>名前を確認して「追加」をタップ</li>
            </ol>
          </section>

          <p style={{ fontSize: "0.9rem", color: "#666" }}>
            ※iPhoneではSafariのみ対応。他のブラウザ（Chrome、Firefoxなど）では使えません。
          </p>
        </main>
      </Layout>
    </div>
  );
}
