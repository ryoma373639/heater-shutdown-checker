# セットアップ手順 - Miyabi自動実行

## 📊 現在の状態

✅ **完了**:
- サブIssue #3-#18 作成済み（GitHub上で確認済み）
- WAVE_EXECUTION_PLAN.md 作成済み
- wave-executor.sh 自動実行スクリプト作成済み
- タスク分解・DAG構造 完成

⏳ **次のステップ**: GitHub認証のセットアップ

---

## 🔑 ステップ1: GitHub認証

Miyabi Agentの実行にはGitHub認証が必須です。

### 方法A: GitHub Personal Access Token（推奨・最速）

1. **トークン作成**（既にお持ちの場合はスキップ）
   - https://github.com/settings/tokens にアクセス
   - "Generate new token (classic)" をクリック
   - 必要なスコープ: `repo`, `workflow`
   - トークンをコピー（`ghp_` で始まる文字列）

2. **.envファイルに設定**

```bash
# プロジェクトディレクトリで実行
cd /Users/nishitanitoshihiko/Downloads/v2.0/heater-shutdown-checker

# .envファイルを編集
nano .env
```

以下の内容を設定:

```bash
# GitHub Configuration
GITHUB_TOKEN=ghp_あなたのトークンをここに貼り付け

# Repository Information
REPOSITORY=ryoma373639/heater-shutdown-checker

# Anthropic API Key (Agent実行に必要)
ANTHROPIC_API_KEY=sk-ant-あなたのAPIキーをここに貼り付け

# Device Identifier
DEVICE_IDENTIFIER=MyComputer

# Agent Configuration
LOG_DIRECTORY=.ai/logs
REPORT_DIRECTORY=.ai/parallel-reports
DEFAULT_CONCURRENCY=2

# Development Options
USE_TASK_TOOL=false
USE_WORKTREE=false
```

保存: `Ctrl+O` → `Enter` → `Ctrl+X`

### 方法B: Miyabi OAuth認証

```bash
npx miyabi auth login
```

ブラウザが開き、GitHubでOAuth認証します。

---

## ⚡ ステップ2: Anthropic API Key設定

Miyabi AgentはClaude APIを使用するため、Anthropic API Keyも必要です。

1. **API Key取得**（既にお持ちの場合はスキップ）
   - https://console.anthropic.com/ にアクセス
   - API Keysセクションで新しいキーを作成
   - キーをコピー（`sk-ant-` で始まる文字列）

2. **.envファイルに追加**（ステップ1で既に設定済みの場合はスキップ）

```bash
ANTHROPIC_API_KEY=sk-ant-あなたのAPIキーをここに貼り付け
```

---

## 🚀 ステップ3: Wave実行開始

認証設定が完了したら、自動実行スクリプトを実行します。

### オプション1: 全Wave自動実行（推奨）

```bash
cd /Users/nishitanitoshihiko/Downloads/v2.0/heater-shutdown-checker
./wave-executor.sh
```

**所要時間**: 約2.5〜3.5時間（並行実行で70%短縮）

### オプション2: Wave 1のみ実行（テスト）

```bash
# Wave 1: 5タスク並行実行
npx miyabi agent run codegen --issue=3 &
npx miyabi agent run codegen --issue=9 &
npx miyabi agent run codegen --issue=10 &
npx miyabi agent run codegen --issue=12 &
npx miyabi agent run codegen --issue=13 &
wait
echo "✅ Wave 1 完了"
```

**所要時間**: 約15-20分

### オプション3: 個別Issue実行

```bash
# 特定のIssueのみ実行
npx miyabi agent run codegen --issue=3
```

---

## 📝 実行後の確認

### 1. Issue状態確認

```bash
gh issue list --limit 20
```

または

```bash
npx miyabi status
```

### 2. Pull Request確認

各Agentが完了すると、自動的にPRが作成されます。

```bash
gh pr list
```

### 3. ログ確認

```bash
# Agent実行ログ
cat .ai/logs/codegen-issue-3.log

# 並行実行レポート
cat .ai/parallel-reports/wave-1-report.json
```

---

## 🎯 実行フロー

```
Wave 1 (並行5タスク)
  ↓
Wave 2 (並行2タスク) ← #3完了後
  ↓
Wave 3 (並行3タスク) ← #4, #6完了後
  ↓
Wave 4 (1タスク) ← #7完了後
  ↓
Wave 5 (並行2タスク) ← #7, #8, #14完了後
  ↓
Wave 6 (1タスク) ← #10, #11, #14完了後
  ↓
Wave 7 (1タスク) ← #5, #7, #8, #14完了後
  ↓
Wave 8 (最終) ← すべて完了後
  ↓
🎉 v1.0.0リリース完了
```

---

## ❗ トラブルシューティング

### Q1: `Not authenticated` エラー

```bash
# 認証状態確認
npx miyabi auth status

# 再認証
npx miyabi auth login
```

または

```bash
# .envファイル確認
cat .env | grep GITHUB_TOKEN
```

### Q2: Agent実行が失敗する

```bash
# ログ確認
tail -f .ai/logs/codegen-issue-3.log

# 詳細モードで再実行
npx miyabi agent run codegen --issue=3 --verbose
```

### Q3: API Key エラー

```bash
# .envファイル確認
cat .env | grep ANTHROPIC_API_KEY

# API Key が正しく設定されているか確認
```

---

## 📂 作成されたファイル

```
heater-shutdown-checker/
├── MASTER_ISSUE.md              # マスターIssue定義
├── TASK_DAG.md                  # DAG構造・依存関係
├── WAVE_EXECUTION_PLAN.md       # Wave実行プラン（詳細）
├── SETUP_INSTRUCTIONS.md        # このファイル
├── wave-executor.sh             # 全Wave自動実行スクリプト
├── create-sub-issues.sh         # サブIssue作成スクリプト（実行済み）
└── .env                         # 認証情報（要設定）
```

---

## 🌸 次のステップ

1. **認証設定**: .envファイルにGITHUB_TOKENとANTHROPIC_API_KEYを設定
2. **Wave実行**: `./wave-executor.sh` を実行
3. **進捗監視**: GitHub IssuesとPull Requestsで進捗確認
4. **リリース**: Wave 8完了後、v1.0.0リリース

---

🌸 **Miyabi Framework** - 完全自動化された自律型開発フレームワーク
