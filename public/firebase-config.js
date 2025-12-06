// Firebase設定
// このファイルは公開されても問題ありません（クライアント側の設定）

// 🔧 セットアップ手順：
// 1. https://console.firebase.google.com/ にアクセス
// 2. 新しいプロジェクトを作成
// 3. Realtime Database を有効化
// 4. 以下の設定を自分のFirebase設定に置き換える

const firebaseConfig = {
  // 🔧 ここを自分のFirebase設定に置き換えてください
  apiKey: "AIzaSyDEMO_REPLACE_WITH_YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};

// Firebase初期化
let database = null;
let isFirebaseEnabled = false;

function initFirebase() {
  try {
    // Firebase設定が有効かチェック
    if (firebaseConfig.apiKey.includes('DEMO') || firebaseConfig.apiKey.includes('REPLACE')) {
      console.warn('⚠️ Firebase設定が未設定です。localStorageモードで動作します。');
      console.warn('📝 firebase-config.js を編集して、自分のFirebase設定を入力してください。');
      isFirebaseEnabled = false;
      return false;
    }

    // Firebaseアプリを初期化
    const app = firebase.initializeApp(firebaseConfig);
    database = firebase.database();
    isFirebaseEnabled = true;

    console.log('✅ Firebase接続成功！全デバイス同期が有効です。');
    return true;
  } catch (error) {
    console.error('❌ Firebase初期化エラー:', error);
    console.warn('⚠️ localStorageモードにフォールバックします。');
    isFirebaseEnabled = false;
    return false;
  }
}

// Firebase接続状態を取得
function isFirebaseConnected() {
  return isFirebaseEnabled && database !== null;
}

// データベース参照を取得
function getDatabase() {
  return database;
}
