# 🔥 灯油ストーブ消火確認アプリ

灯油ストーブの消火確認を管理するPWA（Progressive Web App）アプリケーションです。
複数の工場で働く社員の消火確認状況をリアルタイムで追跡できます。

## ✨ 機能

- 📱 **PWA対応**: オフラインでも動作、スマートフォンにインストール可能
- 🏭 **複数工場対応**: 4つの工場（第一〜第四工場）のタブ管理
- ✅ **消火確認チェック**: 社員ごとのチェックボックスで簡単確認
- 👥 **社員管理**: 社員の追加・削除・再使用が可能
- 🔄 **自動リセット**: 毎日AM3時に社員リストとチェック状態を全てクリア
- 💾 **データ永続化**: localStorageでデータを保存
- 🌐 **完全オフライン**: インターネット接続不要で動作
- 🔥 **全デバイス同期**（オプション）: Firebase使用で全端末リアルタイム同期

## 🚀 クイックスタート

### 方法1: GitHub Pagesでアクセス

https://ryoma373639.github.io/heater-shutdown-checker/

### 方法2: ローカルで実行

```bash
# リポジトリをクローン
git clone https://github.com/ryoma373639/heater-shutdown-checker.git
cd heater-shutdown-checker

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで http://localhost:3000 を開いてください。

### 方法3: 配布用ZIPをダウンロード

1. [Releases](https://github.com/ryoma373639/heater-shutdown-checker/releases)から最新版をダウンロード
2. ZIPファイルを解凍
3. `index.html`をブラウザで開く

## 📱 スマートフォンにインストール

### iOS (Safari)

1. Safariでアプリを開く
2. 画面下部の共有ボタンをタップ
3. 「ホーム画面に追加」を選択
4. 「追加」をタップ

### Android (Chrome)

1. Chromeでアプリを開く
2. 右上のメニュー（⋮）をタップ
3. 「ホーム画面に追加」を選択
4. 「追加」をタップ

## 🔥 全デバイス同期を有効にする（オプション）

**デフォルトでは、各端末で独立して動作します。**

全社員で同じデータを共有したい場合は、Firebase Realtime Databaseを設定してください：

1. [Firebase設定ガイド](docs/FIREBASE_SETUP.md)を参照
2. 無料で設定可能（約5分）
3. 設定後、全デバイスでリアルタイム同期

**同期機能の効果:**
- 👤 誰かが社員を追加 → 全員の端末に即座に反映
- ✅ 誰かがチェック → 全員の画面が更新
- 🔄 リセットも全デバイスで同期

## 📖 使い方

### 社員を追加

1. 「社員の追加」欄に社員名を入力
2. 「追加」ボタンをクリック

### 消火確認をチェック

1. 該当する工場のタブを選択
2. 消火確認が完了した社員のチェックボックスをオン

### 最終確認

1. 「最終確認・完了」ボタンをクリック
2. 未確認者がいる場合は警告が表示されます
3. 全員確認済みの場合は完了メッセージが表示されます

### 社員を再使用

1. 「再使用」欄に番号と名前を入力
2. 「再使用」ボタンをクリック

## 🛠️ 技術スタック

- **フロントエンド**: Pure HTML/CSS/JavaScript (フレームワーク不使用)
- **PWA**: Service Worker, Web App Manifest
- **ストレージ**: localStorage
- **スタイリング**: カスタムCSS (レスポンシブデザイン)
- **配布**: GitHub Pages / GitHub Releases

## 📂 ディレクトリ構造

```
heater-shutdown-checker/
├── public/               # 公開ディレクトリ
│   ├── index.html       # メインHTML
│   ├── manifest.json    # PWAマニフェスト
│   ├── sw.js            # Service Worker
│   └── assets/          # 静的リソース
│       ├── css/         # スタイルシート
│       ├── js/          # JavaScript
│       └── icons/       # アイコン画像
├── docs/                # ドキュメント
│   ├── INSTALL.md       # インストール手順
│   ├── USER_GUIDE.md    # ユーザーガイド
│   └── DEVELOPER.md     # 開発者向けドキュメント
├── scripts/             # ビルドスクリプト
│   └── build.js         # 配布用ビルド
├── dist/                # ビルド出力
└── package.json         # NPMパッケージ設定
```

## 🔒 セキュリティ

- XSS対策: ユーザー入力は適切にサニタイズ
- データ保存: localStorageのみ使用（外部送信なし）
- HTTPS推奨: Service WorkerはHTTPS環境で動作

## 📜 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) をご確認ください。

## 🤝 貢献

プルリクエストを歓迎します！詳細は [docs/DEVELOPER.md](docs/DEVELOPER.md) をご確認ください。

## 🐛 バグ報告・機能要望

[GitHub Issues](https://github.com/ryoma373639/heater-shutdown-checker/issues)で報告してください。

## 📞 サポート

質問がある場合は、[GitHub Discussions](https://github.com/ryoma373639/heater-shutdown-checker/discussions)をご利用ください。

---

🤖 Developed with [Miyabi](https://miyabi.app) - Autonomous Development Framework
