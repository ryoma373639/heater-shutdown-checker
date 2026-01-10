// 簡易パスワード認証システム
// 注意: JavaScriptベースの認証は技術者なら突破可能です

(function() {
  'use strict';

  // パスワードのSHA-256ハッシュ
  // 元のパスワード: hmt1541
  const CORRECT_HASH = '9e5c8c8c2d5c9e4f7c8d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b';

  // 実際のハッシュを計算（初回のみ）
  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  // 認証状態をチェック
  function isAuthenticated() {
    const authToken = localStorage.getItem('heater-auth-token');
    const authTime = localStorage.getItem('heater-auth-time');

    if (!authToken || !authTime) {
      return false;
    }

    // 30日間有効
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    const now = new Date().getTime();
    if (now - parseInt(authTime) > thirtyDays) {
      // 期限切れ
      localStorage.removeItem('heater-auth-token');
      localStorage.removeItem('heater-auth-time');
      return false;
    }

    return authToken === 'authenticated';
  }

  // 認証を実行
  async function authenticate(password) {
    const hash = await hashPassword(password);

    // カスタムパスワードがあればそれを使用、なければデフォルト
    const customPasswordHash = localStorage.getItem('heater-custom-password-hash');
    const correctHash = customPasswordHash || await hashPassword('hmt1541');

    if (hash === correctHash) {
      localStorage.setItem('heater-auth-token', 'authenticated');
      localStorage.setItem('heater-auth-time', new Date().getTime().toString());
      return true;
    }
    return false;
  }

  // パスワードを変更
  async function changePassword(currentPassword, newPassword) {
    // 現在のパスワードで認証
    const isValid = await authenticate(currentPassword);

    if (!isValid) {
      return { success: false, error: '現在のパスワードが正しくありません' };
    }

    // 新しいパスワードが短すぎる場合
    if (newPassword.length < 4) {
      return { success: false, error: '新しいパスワードは4文字以上で設定してください' };
    }

    // 新しいパスワードをハッシュ化して保存
    const newHash = await hashPassword(newPassword);
    localStorage.setItem('heater-custom-password-hash', newHash);

    // 認証トークンを更新
    localStorage.setItem('heater-auth-token', 'authenticated');
    localStorage.setItem('heater-auth-time', new Date().getTime().toString());

    return { success: true };
  }

  // 認証画面を表示
  function showAuthScreen() {
    // 既存のコンテンツを隠す
    document.body.style.overflow = 'hidden';

    // 認証画面を作成
    const authScreen = document.createElement('div');
    authScreen.id = 'auth-screen';
    authScreen.innerHTML = `
      <style>
        #auth-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .auth-container {
          background: rgba(255, 255, 255, 0.98);
          border-radius: 24px;
          padding: 50px 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          max-width: 400px;
          width: 90%;
          text-align: center;
          animation: slideUp 0.4s ease;
        }

        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .auth-icon {
          font-size: 60px;
          margin-bottom: 20px;
          animation: pulse 2s ease infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .auth-title {
          font-size: 28px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 10px;
        }

        .auth-subtitle {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 30px;
        }

        .auth-input {
          width: 100%;
          padding: 16px 20px;
          font-size: 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          outline: none;
          transition: all 0.3s ease;
          font-family: 'Courier New', monospace;
          text-align: center;
          letter-spacing: 2px;
        }

        .auth-input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .auth-button {
          width: 100%;
          padding: 16px;
          margin-top: 20px;
          font-size: 16px;
          font-weight: 600;
          color: white;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .auth-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .auth-button:active {
          transform: translateY(0);
        }

        .auth-error {
          color: #dc2626;
          font-size: 14px;
          margin-top: 15px;
          display: none;
          animation: shake 0.5s ease;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        .auth-error.show {
          display: block;
        }
      </style>

      <div class="auth-container">
        <div class="auth-icon">🔐</div>
        <div class="auth-title">認証が必要です</div>
        <div class="auth-subtitle">パスワードを入力してください</div>

        <input
          type="password"
          class="auth-input"
          id="auth-password"
          placeholder="パスワード"
          autocomplete="off"
        >

        <button class="auth-button" id="auth-submit">ログイン</button>

        <div class="auth-error" id="auth-error">
          ❌ パスワードが正しくありません
        </div>
      </div>
    `;

    document.body.appendChild(authScreen);

    // イベントリスナー
    const passwordInput = document.getElementById('auth-password');
    const submitButton = document.getElementById('auth-submit');
    const errorDiv = document.getElementById('auth-error');

    async function handleSubmit() {
      const password = passwordInput.value.trim();

      if (!password) {
        return;
      }

      const success = await authenticate(password);

      if (success) {
        // 認証成功
        authScreen.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
          authScreen.remove();
          document.body.style.overflow = '';
          // ページをリロード
          window.location.reload();
        }, 300);
      } else {
        // 認証失敗
        errorDiv.classList.add('show');
        passwordInput.value = '';
        passwordInput.focus();

        // エラーメッセージを3秒後に非表示
        setTimeout(() => {
          errorDiv.classList.remove('show');
        }, 3000);
      }
    }

    submitButton.addEventListener('click', handleSubmit);

    passwordInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    });

    // フォーカス
    passwordInput.focus();
  }

  // ページ読み込み時にチェック
  window.addEventListener('DOMContentLoaded', () => {
    if (!isAuthenticated()) {
      showAuthScreen();
    }
  });

  // グローバルに公開（デバッグ用）
  window.heaterAuth = {
    isAuthenticated,
    changePassword,
    hashPassword,
    logout: function() {
      localStorage.removeItem('heater-auth-token');
      localStorage.removeItem('heater-auth-time');
      window.location.reload();
    }
  };
})();

// fadeOut アニメーション追加
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;
document.head.appendChild(style);
