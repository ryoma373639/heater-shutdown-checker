# Firebase設定ガイド - 全デバイス同期を有効にする

このガイドでは、Firebase Realtime Databaseを使って、全デバイスでデータをリアルタイム同期する方法を説明します。

## 📱 同期機能とは？

**Firebase設定前（現在）:**
- 各デバイスで独立して動作
- データは端末内のlocalStorageのみに保存

**Firebase設定後:**
- ✅ 全デバイスでデータ同期
- ✅ 社員を追加すると、全端末に即座に反映
- ✅ チェックも全員で共有
- ✅ リアルタイム更新

## 🚀 セットアップ手順（無料）

### ステップ1: Firebaseプロジェクト作成

1. **Firebaseコンソールにアクセス**
   - https://console.firebase.google.com/
   - Googleアカウントでログイン

2. **新しいプロジェクトを作成**
   - 「プロジェクトを追加」をクリック
   - プロジェクト名: `heater-checker`（任意）
   - Google アナリティクス: 不要（スキップ可）
   - 「プロジェクトを作成」をクリック

3. **プロジェクトが作成されるまで待つ**
   - 約30秒〜1分

### ステップ2: Realtime Database を有効化

1. **左側メニューから「Realtime Database」を選択**

2. **「データベースを作成」をクリック**

3. **ロケーションを選択**
   - アジア太平洋: `asia-southeast1`（シンガポール）
   - 「次へ」をクリック

4. **セキュリティルールを選択**
   - 🔴 **重要**: 「テストモードで開始」を選択
   - 「有効にする」をクリック

5. **データベースが作成される**
   - 緑色の「〜-default-rtdb」と表示されればOK

### ステップ3: Firebase設定を取得

1. **プロジェクト設定を開く**
   - 左上の⚙️（歯車アイコン）→「プロジェクトの設定」

2. **スクロールして「マイアプリ」セクションを見つける**
   - 何も表示されていない場合、「</> ウェブ」アイコンをクリック
   - アプリのニックネーム: `heater-checker-web`
   - 「Firebase Hosting」は不要（チェックなし）
   - 「アプリを登録」をクリック

3. **Firebase設定をコピー**
   - `firebaseConfig`のコードが表示されます
   - 以下のような形式です：

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "heater-checker-xxxxx.firebaseapp.com",
  databaseURL: "https://heater-checker-xxxxx-default-rtdb.firebaseio.com",
  projectId: "heater-checker-xxxxx",
  storageBucket: "heater-checker-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxx"
};
```

### ステップ4: アプリに設定を適用

#### 方法A: GitHubでファイルを直接編集（簡単）

1. **GitHub上の設定ファイルを開く**
   - https://github.com/ryoma373639/heater-shutdown-checker/blob/main/public/firebase-config.js

2. **鉛筆アイコン（Edit）をクリック**

3. **ステップ3でコピーした設定を貼り付け**
   - `apiKey`, `authDomain`, `databaseURL`などを置き換える

4. **「Commit changes」をクリック**
   - 数分後、自動的にデプロイされます

#### 方法B: ローカルで編集

1. **`public/firebase-config.js`を開く**

2. **以下の部分を置き換える:**

```javascript
const firebaseConfig = {
  // 🔧 ここを自分のFirebase設定に置き換えてください
  apiKey: "AIzaSyDEMO_REPLACE_WITH_YOUR_API_KEY",  // ← 置き換え
  authDomain: "your-project.firebaseapp.com",     // ← 置き換え
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",  // ← 置き換え
  projectId: "your-project",                      // ← 置き換え
  storageBucket: "your-project.appspot.com",      // ← 置き換え
  messagingSenderId: "123456789",                 // ← 置き換え
  appId: "1:123456789:web:abc123def456"           // ← 置き換え
};
```

3. **ファイルを保存**

4. **GitHubにプッシュ**
   ```bash
   git add public/firebase-config.js
   git commit -m "feat: Firebase設定を追加"
   git push
   ```

### ステップ5: 動作確認

1. **アプリにアクセス**
   - https://ryoma373639.github.io/heater-shutdown-checker/

2. **ブラウザのコンソールを開く（F12キー）**

3. **以下のメッセージが表示されればOK:**
   ```
   ✅ Firebase接続成功！全デバイス同期が有効です。
   🔄 リアルタイム同期を開始...
   ✅ 全デバイス同期が有効になりました！
   ```

4. **複数デバイスでテスト:**
   - スマホとPCで同時にアプリを開く
   - 片方で社員を追加
   - もう片方で自動的に反映されることを確認

## 🔒 セキュリティルールの設定（推奨）

テストモードは**30日間のみ**有効です。本番運用する場合は、以下のルールに変更してください。

1. **Firebaseコンソール → Realtime Database → ルール**

2. **以下のルールに変更:**

```json
{
  "rules": {
    "factories": {
      ".read": true,
      ".write": true
    },
    "settings": {
      ".read": true,
      ".write": true
    }
  }
}
```

3. **「公開」をクリック**

**注意:** このルールは誰でも読み書き可能です。社内ネットワーク内での使用を推奨します。

### より安全なルール（パスワード認証）

認証機能を追加する場合は、別途Firebase Authenticationの設定が必要です。

## ❓ よくある質問

**Q: Firebase設定しないとアプリは使えない？**
A: いいえ、設定しなくても各端末で独立して使えます。全デバイス同期したい場合のみ設定してください。

**Q: Firebaseは無料？**
A: はい、小規模利用（同時接続100人以下、1GB/月のデータ転送）なら無料です。

**Q: データは安全？**
A: Firebaseは業界標準のセキュリティを備えていますが、セキュリティルールの設定が重要です。

**Q: オフラインでも使える？**
A: はい、オフライン時はlocalStorageにフォールバックします。オンラインに復帰すると自動同期されます。

**Q: Firebase設定後、元に戻せる？**
A: はい、firebase-config.jsのapiKeyを元のDEMO値に戻すと、localStorage��ードに戻ります。

**Q: エラーが出る**
A: ブラウザのコンソール（F12）でエラーメッセージを確認してください。設定のコピーミスが多いです。

## 📞 サポート

設定でお困りの場合：
- [GitHub Issues](https://github.com/ryoma373639/heater-shutdown-checker/issues)
- [GitHub Discussions](https://github.com/ryoma373639/heater-shutdown-checker/discussions)

---

📅 最終更新: 2025年12月
🤖 Powered by Miyabi
