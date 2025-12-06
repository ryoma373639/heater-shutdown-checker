#!/bin/bash

# GitHub API設定
GITHUB_TOKEN="${GITHUB_TOKEN}"
REPO="ryoma373639/heater-shutdown-checker"
MASTER_ISSUE=2

# サブIssue作成関数
create_issue() {
  local title="$1"
  local body="$2"
  local labels="$3"

  curl -X POST \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer ${GITHUB_TOKEN}" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "https://api.github.com/repos/${REPO}/issues" \
    -d "$(jq -n \
      --arg title "$title" \
      --arg body "$body" \
      --argjson labels "$labels" \
      '{title: $title, body: $body, labels: $labels}')" | jq -r '.number'
}

echo "🚀 サブIssue作成開始..."

# Phase 1: 基本構造のセットアップ
echo "📦 Phase 1: 基本構造のセットアップ"

ISSUE_3=$(create_issue \
  "プロジェクト構造整理" \
  "## タスク

- [ ] publicディレクトリにHTMLファイル配置（完了）
- [ ] assetsディレクトリ作成（CSS/JS分離の準備）
- [ ] .gitignore設定

## 依存
なし

## 担当
agent:codegen

## 関連
マスターIssue #${MASTER_ISSUE}" \
  '["type:refactor", "phase:planning", "priority:P0-Critical", "agent:codegen"]')
echo "✅ Issue #${ISSUE_3}: プロジェクト構造整理"

ISSUE_4=$(create_issue \
  "package.json設定とスクリプト整備" \
  "## タスク

- [ ] 開発用スクリプト追加（\`npm run dev\`）
- [ ] ビルドスクリプト追加（\`npm run build\`）
- [ ] プレビュースクリプト追加（\`npm run preview\`）

## 依存
Issue #${ISSUE_3}

## 担当
agent:codegen

## 関連
マスターIssue #${MASTER_ISSUE}" \
  '["type:feature", "phase:development", "priority:P0-Critical", "agent:codegen"]')
echo "✅ Issue #${ISSUE_4}: package.json設定とスクリプト整備"

ISSUE_5=$(create_issue \
  "ローカル開発サーバーセットアップ" \
  "## タスク

- [ ] 軽量HTTPサーバー導入（例: http-server, serve）
- [ ] 開発環境の動作確認

## 依存
Issue #${ISSUE_4}

## 担当
agent:codegen

## 関連
マスターIssue #${MASTER_ISSUE}" \
  '["type:feature", "phase:development", "priority:P1-High", "agent:codegen"]')
echo "✅ Issue #${ISSUE_5}: ローカル開発サーバーセットアップ"

# Phase 2: PWA化実装
echo "📱 Phase 2: PWA化実装"

ISSUE_6=$(create_issue \
  "manifest.json作成" \
  "## タスク

- [ ] アプリ名、説明、テーマカラー設定
- [ ] アイコン設定（複数サイズ）
- [ ] display: standalone設定
- [ ] start_url設定

## 依存
Issue #${ISSUE_3}

## 担当
agent:codegen

## 関連
マスターIssue #${MASTER_ISSUE}" \
  '["type:feature", "phase:development", "priority:P0-Critical", "agent:codegen"]')
echo "✅ Issue #${ISSUE_6}: manifest.json作成"

ISSUE_7=$(create_issue \
  "Service Worker実装" \
  "## タスク

- [ ] sw.js作成
- [ ] キャッシュ戦略実装（Cache First）
- [ ] 静的リソースのプリキャッシュ
- [ ] Service Worker登録スクリプト追加

## 依存
Issue #${ISSUE_6}

## 担当
agent:codegen

## 関連
マスターIssue #${MASTER_ISSUE}" \
  '["type:feature", "phase:development", "priority:P0-Critical", "agent:codegen"]')
echo "✅ Issue #${ISSUE_7}: Service Worker実装"

ISSUE_8=$(create_issue \
  "オフライン対応とテスト" \
  "## タスク

- [ ] オフライン動作確認
- [ ] localStorageの永続性確認
- [ ] ネットワーク切断時の挙動テスト

## 依存
Issue #${ISSUE_7}

## 担当
agent:review

## 関連
マスターIssue #${MASTER_ISSUE}" \
  '["type:test", "phase:review", "priority:P1-High", "agent:review"]')
echo "✅ Issue #${ISSUE_8}: オフライン対応とテスト"

ISSUE_9=$(create_issue \
  "アイコン・画像リソース準備" \
  "## タスク

- [ ] 192x192アイコン作成
- [ ] 512x512アイコン作成
- [ ] ファビコン作成
- [ ] スプラッシュスクリーン画像作成（オプション）

## 依存
なし

## 担当
agent:codegen

## 関連
マスターIssue #${MASTER_ISSUE}" \
  '["type:feature", "design", "priority:P2-Medium", "agent:codegen"]')
echo "✅ Issue #${ISSUE_9}: アイコン・画像リソース準備"

# Phase 3: ドキュメント作成
echo "📚 Phase 3: ドキュメント作成"

ISSUE_10=$(create_issue \
  "README.md作成" \
  "## タスク

- [ ] プロジェクト概要
- [ ] 機能一覧
- [ ] クイックスタート
- [ ] 技術スタック
- [ ] ライセンス情報

## 依存
なし

## 担当
agent:codegen

## 関連
マスターIssue #${MASTER_ISSUE}" \
  '["type:docs", "phase:development", "priority:P1-High", "agent:codegen"]')
echo "✅ Issue #${ISSUE_10}: README.md作成"

ISSUE_11=$(create_issue \
  "インストール手順書作成" \
  "## タスク

- [ ] Windows向け手順
- [ ] macOS向け手順
- [ ] スマートフォン向け手順（PWAインストール）
- [ ] トラブルシューティング

## 依存
Issue #${ISSUE_7}, Issue #${ISSUE_8}

## 担当
agent:codegen

## 関連
マスターIssue #${MASTER_ISSUE}" \
  '["type:docs", "priority:P0-Critical", "agent:codegen"]')
echo "✅ Issue #${ISSUE_11}: インストール手順書作成"

ISSUE_12=$(create_issue \
  "ユーザーガイド作成" \
  "## タスク

- [ ] 基本的な使い方
- [ ] 社員の追加・削除方法
- [ ] 工場タブの使い方
- [ ] データリセットのタイミング
- [ ] FAQ

## 依存
なし

## 担当
agent:codegen

## 関連
マスターIssue #${MASTER_ISSUE}" \
  '["type:docs", "priority:P2-Medium", "agent:codegen"]')
echo "✅ Issue #${ISSUE_12}: ユーザーガイド作成"

ISSUE_13=$(create_issue \
  "開発者向けドキュメント作成" \
  "## タスク

- [ ] ディレクトリ構造説明
- [ ] カスタマイズ方法
- [ ] 貢献ガイドライン

## 依存
なし

## 担当
agent:codegen

## 関連
マスターIssue #${MASTER_ISSUE}" \
  '["type:docs", "priority:P3-Low", "agent:codegen"]')
echo "✅ Issue #${ISSUE_13}: 開発者向けドキュメント作成"

# Phase 4: 配布パッケージ作成
echo "📦 Phase 4: 配布パッケージ作成"

ISSUE_14=$(create_issue \
  "ビルドスクリプト作成" \
  "## タスク

- [ ] distディレクトリ作成スクリプト
- [ ] 必要ファイルのコピー
- [ ] 不要ファイルの除外

## 依存
Issue #${ISSUE_4}

## 担当
agent:codegen

## 関連
マスターIssue #${MASTER_ISSUE}" \
  '["type:feature", "phase:development", "priority:P1-High", "agent:codegen"]')
echo "✅ Issue #${ISSUE_14}: ビルドスクリプト作成"

ISSUE_15=$(create_issue \
  "GitHub Releasesセットアップ" \
  "## タスク

- [ ] リリースノートテンプレート作成
- [ ] GitHub Actions for Releases設定
- [ ] バージョニング戦略決定

## 依存
Issue #${ISSUE_14}

## 担当
agent:deploy

## 関連
マスターIssue #${MASTER_ISSUE}" \
  '["type:feature", "deployment", "priority:P1-High", "agent:deploy"]')
echo "✅ Issue #${ISSUE_15}: GitHub Releasesセットアップ"

ISSUE_16=$(create_issue \
  "配布用ZIPパッケージ作成" \
  "## タスク

- [ ] ZIP作成スクリプト
- [ ] README、ライセンス含める
- [ ] インストール手順書含める

## 依存
Issue #${ISSUE_14}, Issue #${ISSUE_10}, Issue #${ISSUE_11}

## 担当
agent:deploy

## 関連
マスターIssue #${MASTER_ISSUE}" \
  '["type:feature", "deployment", "priority:P0-Critical", "agent:deploy"]')
echo "✅ Issue #${ISSUE_16}: 配布用ZIPパッケージ作成"

# Phase 5: 品質保証・デプロイ
echo "🔍 Phase 5: 品質保証・デプロイ"

ISSUE_17=$(create_issue \
  "セキュリティ監査" \
  "## タスク

- [ ] XSS脆弱性チェック
- [ ] localStorage安全性確認
- [ ] HTTPS推奨設定

## 依存
すべてのコード実装Issue

## 担当
agent:review

## 関連
マスターIssue #${MASTER_ISSUE}" \
  '["special:security", "phase:review", "priority:P1-High", "agent:review"]')
echo "✅ Issue #${ISSUE_17}: セキュリティ監査"

ISSUE_18=$(create_issue \
  "最終動作確認とリリース" \
  "## タスク

- [ ] 全機能の動作確認
- [ ] 複数環境でのテスト（Windows/Mac/Mobile）
- [ ] v1.0.0リリース

## 依存
すべてのIssue

## 担当
agent:deploy

## 関連
マスターIssue #${MASTER_ISSUE}" \
  '["type:test", "phase:deployment", "priority:P0-Critical", "agent:deploy"]')
echo "✅ Issue #${ISSUE_18}: 最終動作確認とリリース"

echo ""
echo "🎉 完了！16個のサブIssueを作成しました"
echo ""
echo "作成されたIssue:"
echo "  #${ISSUE_3}  - プロジェクト構造整理"
echo "  #${ISSUE_4}  - package.json設定とスクリプト整備"
echo "  #${ISSUE_5}  - ローカル開発サーバーセットアップ"
echo "  #${ISSUE_6}  - manifest.json作成"
echo "  #${ISSUE_7}  - Service Worker実装"
echo "  #${ISSUE_8}  - オフライン対応とテスト"
echo "  #${ISSUE_9}  - アイコン・画像リソース準備"
echo "  #${ISSUE_10} - README.md作成"
echo "  #${ISSUE_11} - インストール手順書作成"
echo "  #${ISSUE_12} - ユーザーガイド作成"
echo "  #${ISSUE_13} - 開発者向けドキュメント作成"
echo "  #${ISSUE_14} - ビルドスクリプト作成"
echo "  #${ISSUE_15} - GitHub Releasesセットアップ"
echo "  #${ISSUE_16} - 配布用ZIPパッケージ作成"
echo "  #${ISSUE_17} - セキュリティ監査"
echo "  #${ISSUE_18} - 最終動作確認とリリース"
echo ""
echo "次のステップ:"
echo "  1. GitHub Actionsが各Issueを自動処理します"
echo "  2. または、手動でmiyabi agentを実行: npx miyabi agent run codegen --issue=<番号>"
