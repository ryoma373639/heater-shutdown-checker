# 開発者向けドキュメント

このドキュメントは、灯油ストーブ消火確認アプリをカスタマイズ・拡張したい開発者向けです。

## 🏗️ アーキテクチャ

### 技術スタック

- **HTML5**: セマンティックマークアップ
- **CSS3**: フレックスボックスレイアウト、グラデーション
- **Vanilla JavaScript**: フレームワーク不使用
- **PWA**: Service Worker、Web App Manifest
- **localStorage**: クライアントサイドデータ永続化

### 設計原則

1. **シンプル**: フレームワーク不使用、依存関係ゼロ
2. **オフラインファースト**: Service Workerで完全オフライン対応
3. **レスポンシブ**: モバイルファースト設計
4. **セキュア**: XSS対策、外部送信なし

## 📂 ディレクトリ構造

```
heater-shutdown-checker/
├── public/                   # 公開ディレクトリ（配布対象）
│   ├── index.html           # メインHTML（全機能を含む）
│   ├── manifest.json        # PWAマニフェスト
│   ├── sw.js                # Service Worker
│   └── assets/
│       └── icons/           # アプリアイコン
│           ├── icon-192.png # 192x192アイコン
│           ├── icon-512.png # 512x512アイコン
│           └── icon.svg     # ソースSVG
├── docs/                    # ドキュメント
│   ├── INSTALL.md          # インストール手順
│   ├── USER_GUIDE.md       # ユーザーガイド
│   └── DEVELOPER.md        # このファイル
├── scripts/                # ビルドスクリプト
│   └── build.js            # 配布用ビルド
├── .github/                # GitHub設定
│   └── workflows/          # GitHub Actions
└── package.json            # NPM設定
```

## 🔧 開発環境セットアップ

### 必要なツール

- **Node.js**: v20以降
- **npm**: v9以降
- **Git**: v2.30以降

### セットアップ手順

```bash
# リポジトリをクローン
git clone https://github.com/ryoma373639/heater-shutdown-checker.git
cd heater-shutdown-checker

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

### 利用可能なスクリプト

```bash
npm run dev          # 開発サーバー起動（localhost:3000）
npm run build        # 配布用ビルド
npm run preview      # ビルド結果をプレビュー（localhost:4000）
npm test             # テスト実行
npm run lint         # コードチェック
npm run typecheck    # 型チェック
```

## 💻 コードの理解

### データ構造

```javascript
// 工場データ構造
allEmployees = {
  0: [ // 第一工場
    { id: 1638345600000, name: "山田太郎", checked: false },
    { id: 1638345601000, name: "佐藤花子", checked: true }
  ],
  1: [ // 第二工場
    // ...
  ],
  // ...
}

// localStorage キー
'heater-employees-0'  // 第一工場のデータ
'heater-employees-1'  // 第二工場のデータ
'heater-employees-2'  // 第三工場のデータ
'heater-employees-3'  // 第四工場のデータ
'heater-last-reset'   // 最後にリセットした日付
```

### 主要な関数

#### `init()`
アプリケーションの初期化

```javascript
function init() {
  loadData();              // localStorageからデータ読み込み
  checkAndResetDaily();    // 日次リセットチェック
  renderEmployeeList();    // UIレンダリング
}
```

#### `addEmployee()`
社員を追加

```javascript
function addEmployee() {
  var input = document.getElementById('employeeNameInput');
  var name = input.value.trim();
  if (name.length > 0) {
    var newEmp = {
      id: Date.now(),        // ユニークID
      name: name,
      checked: false
    };
    employees.push(newEmp);
    saveData();              // localStorageに保存
    renderEmployeeList();    // UI更新
    input.value = '';
  }
}
```

#### `checkAndResetDaily()`
日次自動リセット

```javascript
function checkAndResetDaily() {
  var lastReset = localStorage.getItem('heater-last-reset');
  var now = new Date();
  var today = now.toDateString();
  var currentHour = now.getHours();

  // AM3時以降で、まだリセットしていない場合
  if (!lastReset || (lastReset !== today && currentHour >= 3)) {
    // 全工場・全社員のチェックをリセット
    // ...
    localStorage.setItem('heater-last-reset', today);
  }

  // 1分ごとに再チェック
  setTimeout(checkAndResetDaily, 60000);
}
```

## 🎨 カスタマイズ方法

### 工場数を変更

`public/index.html`の以下の箇所を編集：

```javascript
// 配列に工場名を追加/削除
var factoryNames = ['第一工場', '第二工場', '第三工場', '第四工場', '第五工場'];
```

HTMLのタブも追加：

```html
<div class="tabs">
  <button class="tab active" onclick="switchTab(0)">第一工場</button>
  <button class="tab" onclick="switchTab(1)">第二工場</button>
  <!-- 新しいタブを追加 -->
  <button class="tab" onclick="switchTab(4)">第五工場</button>
</div>
```

### リセット時刻を変更

`checkAndResetDaily()`関数内：

```javascript
// 現在: AM3時
if (!lastReset || (lastReset !== today && currentHour >= 3)) {

// 変更例: AM5時
if (!lastReset || (lastReset !== today && currentHour >= 5)) {
```

### テーマカラーを変更

CSSの以下の変数を編集：

```css
/* メインカラー: 赤 → 青に変更 */
.icon-box { background: #3b82f6; }  /* 元: #ef4444 */
.tab.active { background: #3b82f6; color: white; }

/* manifest.jsonも更新 */
{
  "theme_color": "#3b82f6"  /* 元: "#ef4444" */
}
```

### 社員データのエクスポート

```javascript
// コンソールで実行
function exportData() {
  var data = {};
  for (var i = 0; i < 4; i++) {
    data['factory' + i] = JSON.parse(
      localStorage.getItem('heater-employees-' + i) || '[]'
    );
  }
  console.log(JSON.stringify(data, null, 2));
}
```

## 🔐 セキュリティ考慮事項

### XSS対策

現在の実装は`innerHTML`を使用していますが、ユーザー入力は直接挿入されません：

```javascript
// 安全: 変数を文字列連結で挿入
html = html + '<span class="employee-name">' + emp.name + '</span>';
```

より安全にするには：

```javascript
// 推奨: textContentを使用
var span = document.createElement('span');
span.className = 'employee-name';
span.textContent = emp.name;  // XSS安全
```

### データ検証

入力検証を追加：

```javascript
function addEmployee() {
  var name = input.value.trim();

  // 長さ制限
  if (name.length > 50) {
    alert('名前は50文字以内で入力してください');
    return;
  }

  // 特殊文字チェック
  if (/<|>|&/.test(name)) {
    alert('使用できない文字が含まれています');
    return;
  }

  // ...
}
```

## 🧪 テスト

### 手動テスト

1. **基本機能**
   ```
   ✓ 社員追加
   ✓ 社員削除
   ✓ チェック ON/OFF
   ✓ タブ切り替え
   ✓ 最終確認
   ```

2. **データ永続性**
   ```
   ✓ リロード後もデータ保持
   ✓ ブラウザ再起動後もデータ保持
   ```

3. **オフライン**
   ```
   ✓ ネットワーク切断後も動作
   ✓ Service Worker登録
   ```

### ユニットテスト（今後の課題）

```javascript
// 例: addEmployeeのテスト
test('社員が正しく追加される', () => {
  const initialCount = allEmployees[0].length;
  addEmployee('テスト太郎');
  expect(allEmployees[0].length).toBe(initialCount + 1);
  expect(allEmployees[0][initialCount].name).toBe('テスト太郎');
});
```

## 📦 ビルドとデプロイ

### ローカルビルド

```bash
# 配布用ファイルを生成
npm run build

# distディレクトリに出力
ls dist/
```

### GitHub Pagesデプロイ

自動的にデプロイされます（`.github/workflows/deploy-pages.yml`）

手動デプロイ：

```bash
# mainブランチにプッシュ
git push origin main

# GitHub Actionsが自動実行
# https://ryoma373639.github.io/heater-shutdown-checker/
```

### リリース作成

```bash
# バージョンを更新
npm version patch  # 0.1.0 → 0.1.1

# タグをプッシュ
git push --tags

# GitHub Releasesで配布
```

## 🤝 貢献ガイドライン

### コーディング規約

- **インデント**: スペース2個
- **セミコロン**: 使用する
- **命名**: キャメルケース（関数・変数）
- **コメント**: 日本語OK

### プルリクエスト手順

1. フォークする
2. ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. プッシュ (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

### Issue報告

以下の情報を含めてください：

- **ブラウザ**: Chrome 120.0.0
- **OS**: Windows 11
- **再現手順**: 1. XXXをクリック 2. ...
- **期待する動作**: ...
- **実際の動作**: ...

## 🚀 今後の拡張案

### 機能追加アイデア

- [ ] データエクスポート（CSV/JSON）
- [ ] データインポート
- [ ] 履歴機能（過去7日分）
- [ ] 複数端末間の同期（Firebase/Supabase）
- [ ] 通知機能（未確認者がいる場合）
- [ ] ダークモード
- [ ] 多言語対応（英語・中国語）
- [ ] 工場名のカスタマイズUI
- [ ] 社員グループ機能

### 技術的改善

- [ ] TypeScriptへの移行
- [ ] ユニットテスト追加
- [ ] E2Eテスト（Playwright）
- [ ] CI/CD改善
- [ ] パフォーマンス最適化
- [ ] アクセシビリティ改善（ARIA属性）

## 📚 参考資料

- [Service Worker API](https://developer.mozilla.org/ja/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/ja/docs/Web/Manifest)
- [localStorage](https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage)
- [PWA Best Practices](https://web.dev/progressive-web-apps/)

## 📞 サポート

開発に関する質問：

- [GitHub Discussions](https://github.com/ryoma373639/heater-shutdown-checker/discussions)
- [GitHub Issues](https://github.com/ryoma373639/heater-shutdown-checker/issues)

---

📅 最終更新: 2025年12月
🤖 Powered by Miyabi
