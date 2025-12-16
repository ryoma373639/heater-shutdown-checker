# Wave実行プラン - heater-shutdown-checker

## 📊 サブIssue作成状況

✅ **完了**: 16個のサブIssue (#3-#18) が作成済み

### 作成済みIssue一覧

| Issue # | タイトル | Agent | 優先度 | Phase |
|---------|----------|-------|--------|-------|
| #3 | プロジェクト構造整理 | codegen | P0-Critical | planning |
| #4 | package.json設定とスクリプト整備 | codegen | P0-Critical | development |
| #5 | ローカル開発サーバーセットアップ | codegen | P1-High | development |
| #6 | manifest.json作成 | codegen | P0-Critical | development |
| #7 | Service Worker実装 | codegen | P0-Critical | development |
| #8 | オフライン対応とテスト | review | P1-High | review |
| #9 | アイコン・画像リソース準備 | codegen | P2-Medium | development |
| #10 | README.md作成 | codegen | P1-High | development |
| #11 | インストール手順書作成 | codegen | P0-Critical | docs |
| #12 | ユーザーガイド作成 | codegen | P2-Medium | docs |
| #13 | 開発者向けドキュメント作成 | codegen | P3-Low | docs |
| #14 | ビルドスクリプト作成 | codegen | P1-High | development |
| #15 | GitHub Releasesセットアップ | deploy | P1-High | deployment |
| #16 | 配布用ZIPパッケージ作成 | deploy | P0-Critical | deployment |
| #17 | セキュリティ監査 | review | P1-High | review |
| #18 | 最終動作確認とリリース | deploy | P0-Critical | deployment |

---

## 🌊 Wave 1: 並行実行可能（5タスク）

**依存関係なし - 即座に実行可能**

### 実行コマンド

```bash
# Wave 1: 5タスク並行実行
npx miyabi agent run codegen --issue=3 &   # プロジェクト構造整理
npx miyabi agent run codegen --issue=9 &   # アイコン・画像リソース準備
npx miyabi agent run codegen --issue=10 &  # README.md作成
npx miyabi agent run codegen --issue=12 &  # ユーザーガイド作成
npx miyabi agent run codegen --issue=13 &  # 開発者向けドキュメント作成
wait
```

### 詳細

| Issue # | タイトル | Agent | 優先度 | 推定時間 | 依存 |
|---------|----------|-------|--------|----------|------|
| #3 | プロジェクト構造整理 | codegen | P0-Critical | 10-15分 | なし |
| #9 | アイコン・画像リソース準備 | codegen | P2-Medium | 15-20分 | なし |
| #10 | README.md作成 | codegen | P1-High | 10-15分 | なし |
| #12 | ユーザーガイド作成 | codegen | P2-Medium | 10-15分 | なし |
| #13 | 開発者向けドキュメント作成 | codegen | P3-Low | 10-15分 | なし |

**推定時間**: 15-20分（並行実行）

---

## 🌊 Wave 2: Wave 1の#3完了後（2タスク）

**依存**: Issue #3（プロジェクト構造整理）完了後

### 実行コマンド

```bash
# Wave 2: 2タスク並行実行
npx miyabi agent run codegen --issue=4 &   # package.json設定
npx miyabi agent run codegen --issue=6 &   # manifest.json作成
wait
```

### 詳細

| Issue # | タイトル | Agent | 優先度 | 推定時間 | 依存 |
|---------|----------|-------|--------|----------|------|
| #4 | package.json設定とスクリプト整備 | codegen | P0-Critical | 10-15分 | #3 |
| #6 | manifest.json作成 | codegen | P0-Critical | 10-15分 | #3 |

**推定時間**: 10-15分（並行実行）

---

## 🌊 Wave 3: Wave 2完了後（3タスク）

**依存**: Issue #4, #6完了後

### 実行コマンド

```bash
# Wave 3: 3タスク並行実行
npx miyabi agent run codegen --issue=5 &   # ローカル開発サーバー
npx miyabi agent run codegen --issue=7 &   # Service Worker実装
npx miyabi agent run codegen --issue=14 &  # ビルドスクリプト作成
wait
```

### 詳細

| Issue # | タイトル | Agent | 優先度 | 推定時間 | 依存 |
|---------|----------|-------|--------|----------|------|
| #5 | ローカル開発サーバーセットアップ | codegen | P1-High | 10-15分 | #4 |
| #7 | Service Worker実装 | codegen | P0-Critical | 15-20分 | #6 |
| #14 | ビルドスクリプト作成 | codegen | P1-High | 10-15分 | #4 |

**推定時間**: 15-20分（並行実行）

---

## 🌊 Wave 4: Wave 3の#7完了後（1タスク）

**依存**: Issue #7（Service Worker実装）完了後

### 実行コマンド

```bash
# Wave 4: 1タスク
npx miyabi agent run review --issue=8
```

### 詳細

| Issue # | タイトル | Agent | 優先度 | 推定時間 | 依存 |
|---------|----------|-------|--------|----------|------|
| #8 | オフライン対応とテスト | review | P1-High | 15-20分 | #7 |

**推定時間**: 15-20分

---

## 🌊 Wave 5: Wave 3, 4完了後（2タスク）

**依存**: Issue #7, #8, #14完了後

### 実行コマンド

```bash
# Wave 5: 2タスク並行実行
npx miyabi agent run codegen --issue=11 &  # インストール手順書作成
npx miyabi agent run deploy --issue=15 &   # GitHub Releasesセットアップ
wait
```

### 詳細

| Issue # | タイトル | Agent | 優先度 | 推定時間 | 依存 |
|---------|----------|-------|--------|----------|------|
| #11 | インストール手順書作成 | codegen | P0-Critical | 10-15分 | #7, #8 |
| #15 | GitHub Releasesセットアップ | deploy | P1-High | 10-15分 | #14 |

**推定時間**: 10-15分（並行実行）

---

## 🌊 Wave 6: Wave 5完了後（1タスク）

**依存**: Issue #10, #11, #14完了後

### 実行コマンド

```bash
# Wave 6: 1タスク
npx miyabi agent run deploy --issue=16
```

### 詳細

| Issue # | タイトル | Agent | 優先度 | 推定時間 | 依存 |
|---------|----------|-------|--------|----------|------|
| #16 | 配布用ZIPパッケージ作成 | deploy | P0-Critical | 15-20分 | #10, #11, #14 |

**推定時間**: 15-20分

---

## 🌊 Wave 7: すべてのコード実装完了後（1タスク）

**依存**: Issue #5, #7, #8, #14完了後

### 実行コマンド

```bash
# Wave 7: 1タスク
npx miyabi agent run review --issue=17
```

### 詳細

| Issue # | タイトル | Agent | 優先度 | 推定時間 | 依存 |
|---------|----------|-------|--------|----------|------|
| #17 | セキュリティ監査 | review | P1-High | 20-30分 | #5, #7, #8, #14 |

**推定時間**: 20-30分

---

## 🌊 Wave 8: すべて完了後（1タスク）

**依存**: すべてのIssue完了後

### 実行コマンド

```bash
# Wave 8: 最終タスク
npx miyabi agent run deploy --issue=18
```

### 詳細

| Issue # | タイトル | Agent | 優先度 | 推定時間 | 依存 |
|---------|----------|-------|--------|----------|------|
| #18 | 最終動作確認とリリース | deploy | P0-Critical | 30-45分 | すべて |

**推定時間**: 30-45分

---

## 📊 合計推定時間

- **全タスク順次実行**: 約9-14時間
- **Wave並行実行**: 約2.5-3.5時間（約70%短縮）

---

## 🚀 クリティカルパス（最長経路）

```
#3 → #4 → #7 → #8 → #11 → #16 → #17 → #18
```

**クリティカルパス所要時間**: 約2.5〜3.5時間

---

## 🎯 実行推奨順序

### ステップ1: Wave 1を即座に実行（並行）

```bash
# 以下のコマンドを1つのターミナルで実行
npx miyabi agent run codegen --issue=3 &
npx miyabi agent run codegen --issue=9 &
npx miyabi agent run codegen --issue=10 &
npx miyabi agent run codegen --issue=12 &
npx miyabi agent run codegen --issue=13 &
wait
echo "✅ Wave 1 完了"
```

### ステップ2: Wave 2を実行（#3完了確認後）

```bash
# Issue #3の完了を確認してから実行
gh issue view 3 --json state,labels
npx miyabi agent run codegen --issue=4 &
npx miyabi agent run codegen --issue=6 &
wait
echo "✅ Wave 2 完了"
```

### ステップ3-8: 段階的に実行

各Waveの依存関係を確認しながら順次実行。

---

## 🔧 自動実行スクリプト（推奨）

### wave-executor.sh

```bash
#!/bin/bash

echo "🌊 Wave実行開始..."

# Wave 1
echo "Wave 1: 5タスク並行実行..."
npx miyabi agent run codegen --issue=3 &
npx miyabi agent run codegen --issue=9 &
npx miyabi agent run codegen --issue=10 &
npx miyabi agent run codegen --issue=12 &
npx miyabi agent run codegen --issue=13 &
wait
echo "✅ Wave 1 完了"

# Wave 2
echo "Wave 2: 2タスク並行実行..."
npx miyabi agent run codegen --issue=4 &
npx miyabi agent run codegen --issue=6 &
wait
echo "✅ Wave 2 完了"

# Wave 3
echo "Wave 3: 3タスク並行実行..."
npx miyabi agent run codegen --issue=5 &
npx miyabi agent run codegen --issue=7 &
npx miyabi agent run codegen --issue=14 &
wait
echo "✅ Wave 3 完了"

# Wave 4
echo "Wave 4: 1タスク実行..."
npx miyabi agent run review --issue=8
echo "✅ Wave 4 完了"

# Wave 5
echo "Wave 5: 2タスク並行実行..."
npx miyabi agent run codegen --issue=11 &
npx miyabi agent run deploy --issue=15 &
wait
echo "✅ Wave 5 完了"

# Wave 6
echo "Wave 6: 1タスク実行..."
npx miyabi agent run deploy --issue=16
echo "✅ Wave 6 完了"

# Wave 7
echo "Wave 7: 1タスク実行..."
npx miyabi agent run review --issue=17
echo "✅ Wave 7 完了"

# Wave 8
echo "Wave 8: 最終タスク実行..."
npx miyabi agent run deploy --issue=18
echo "✅ Wave 8 完了"

echo "🎉 全Wave完了！"
```

### 実行方法

```bash
chmod +x wave-executor.sh
./wave-executor.sh
```

---

## 📝 注意事項

1. **GITHUB_TOKEN必須**: Miyabi Agent実行には`.env`にGITHUB_TOKENの設定が必要
2. **ANTHROPIC_API_KEY必須**: CodeGen/Review Agentには`.env`にANTHROPIC_API_KEYの設定が必要
3. **依存関係厳守**: 各Waveは依存関係を満たしてから実行
4. **並行実行数制限**: デフォルトは2並行（.envのDEFAULT_CONCURRENCYで変更可能）

---

🌸 **Miyabi Framework** - 完全自動化されたIssue→PR→Deployパイプライン
