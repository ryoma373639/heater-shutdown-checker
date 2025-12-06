// Firebase設定
// このファイルは公開されても問題ありません（クライアント側の設定）

// 🔧 セットアップ手順：
// 1. https://console.firebase.google.com/ にアクセス
// 2. 新しいプロジェクトを作成
// 3. Realtime Database を有効化
// 4. 以下の設定を自分のFirebase設定に置き換える

const firebaseConfig = {
  // 🔧 Firebase設定（全デバイス同期が有効）
  apiKey: "AIzaSyBAhk1urHmJt9Mx70YTY3UVBOFgt62R5Bs",
  authDomain: "heater-checker.firebaseapp.com",
  databaseURL: "https://heater-checker-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "heater-checker",
  storageBucket: "heater-checker.firebasestorage.app",
  messagingSenderId: "179822727838",
  appId: "1:179822727838:web:fa7ac5ea5e2bd227d9618f",
  measurementId: "G-7QRG30YPLF"
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
