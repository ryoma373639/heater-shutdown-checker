const QRCode = require('qrcode');
const fs = require('fs');

const IP = '192.168.10.119';
const PORT = '8010';

const urls = {
  main: `http://${IP}:${PORT}/index.html`,
  admin: `http://${IP}:${PORT}/admin.html`
};

async function generateQRCodes() {
  try {
    console.log('🎨 QRコード生成中...\n');

    // メインアプリのQRコード
    await QRCode.toFile('qr-main.png', urls.main, {
      width: 500,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    console.log('✅ メインアプリQRコード生成完了: qr-main.png');
    console.log(`   URL: ${urls.main}\n`);

    // 管理画面のQRコード
    await QRCode.toFile('qr-admin.png', urls.admin, {
      width: 500,
      margin: 2,
      color: {
        dark: '#DC2626',
        light: '#FFFFFF'
      }
    });
    console.log('✅ 管理画面QRコード生成完了: qr-admin.png');
    console.log(`   URL: ${urls.admin}\n`);

    // HTMLページも生成（両方のQRコードを表示）
    const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>灯油ストーブ消火確認システム - QRコード</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .container {
      max-width: 1200px;
      width: 100%;
    }

    h1 {
      color: white;
      text-align: center;
      margin-bottom: 40px;
      font-size: 32px;
      text-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }

    .qr-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
    }

    .qr-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      text-align: center;
      transition: transform 0.3s ease;
    }

    .qr-card:hover {
      transform: translateY(-5px);
    }

    .qr-card.main {
      border-top: 5px solid #3b82f6;
    }

    .qr-card.admin {
      border-top: 5px solid #dc2626;
    }

    .qr-title {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 15px;
      color: #1f2937;
    }

    .qr-card.main .qr-title {
      color: #3b82f6;
    }

    .qr-card.admin .qr-title {
      color: #dc2626;
    }

    .qr-image {
      max-width: 100%;
      height: auto;
      border-radius: 10px;
      margin: 20px 0;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }

    .qr-url {
      font-family: 'Courier New', monospace;
      background: #f3f4f6;
      padding: 12px;
      border-radius: 8px;
      color: #374151;
      font-size: 14px;
      word-break: break-all;
      margin-top: 15px;
    }

    .instructions {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      padding: 30px;
      margin-top: 30px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }

    .instructions h2 {
      color: #1f2937;
      margin-bottom: 15px;
      font-size: 20px;
    }

    .instructions ol {
      padding-left: 25px;
      color: #4b5563;
      line-height: 1.8;
    }

    .instructions li {
      margin-bottom: 10px;
    }

    @media print {
      body {
        background: white;
      }

      .qr-card {
        break-inside: avoid;
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔥 灯油ストーブ消火確認システム</h1>

    <div class="qr-grid">
      <div class="qr-card main">
        <div class="qr-title">📱 メインアプリ</div>
        <img src="qr-main.png" alt="メインアプリQRコード" class="qr-image">
        <div class="qr-url">${urls.main}</div>
      </div>

      <div class="qr-card admin">
        <div class="qr-title">⚙️ 管理画面</div>
        <img src="qr-admin.png" alt="管理画面QRコード" class="qr-image">
        <div class="qr-url">${urls.admin}</div>
      </div>
    </div>

    <div class="instructions">
      <h2>📖 使用方法</h2>
      <ol>
        <li><strong>メインアプリ</strong>: スマートフォンでQRコードをスキャンして社員の出退勤を記録</li>
        <li><strong>管理画面</strong>: タブレットやPCでQRコードをスキャンして全工場の状況を管理</li>
        <li>同じWi-Fiネットワーク上のデバイスからアクセス可能です</li>
        <li>このページを印刷して掲示することもできます</li>
      </ol>
    </div>
  </div>
</body>
</html>`;

    fs.writeFileSync('qr-codes.html', html);
    console.log('✅ QRコード表示ページ生成完了: qr-codes.html\n');

    console.log('📱 ブラウザで qr-codes.html を開いてQRコードを確認してください');
    console.log('🖨️  印刷して掲示することもできます\n');

  } catch (error) {
    console.error('❌ エラー:', error);
  }
}

generateQRCodes();
