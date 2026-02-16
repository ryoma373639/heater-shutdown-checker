#!/bin/bash

# Wave実行スクリプト - heater-shutdown-checker
# Miyabi Framework自動実行

set -e

echo "🌸 Miyabi Wave実行開始..."
echo ""

# カラー定義
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Wave 1: 並行実行可能な5タスク
echo -e "${BLUE}🌊 Wave 1: 5タスク並行実行（依存なし）${NC}"
echo "  - Issue #3:  プロジェクト構造整理"
echo "  - Issue #9:  アイコン・画像リソース準備"
echo "  - Issue #10: README.md作成"
echo "  - Issue #12: ユーザーガイド作成"
echo "  - Issue #13: 開発者向けドキュメント作成"
echo ""

npx miyabi agent run codegen --issue=3 &
PID1=$!
npx miyabi agent run codegen --issue=9 &
PID2=$!
npx miyabi agent run codegen --issue=10 &
PID3=$!
npx miyabi agent run codegen --issue=12 &
PID4=$!
npx miyabi agent run codegen --issue=13 &
PID5=$!

wait $PID1 $PID2 $PID3 $PID4 $PID5
echo -e "${GREEN}✅ Wave 1 完了${NC}"
echo ""

# Wave 2: Issue #3完了後
echo -e "${BLUE}🌊 Wave 2: 2タスク並行実行（#3完了後）${NC}"
echo "  - Issue #4: package.json設定とスクリプト整備"
echo "  - Issue #6: manifest.json作成"
echo ""

npx miyabi agent run codegen --issue=4 &
PID6=$!
npx miyabi agent run codegen --issue=6 &
PID7=$!

wait $PID6 $PID7
echo -e "${GREEN}✅ Wave 2 完了${NC}"
echo ""

# Wave 3: Wave 2完了後
echo -e "${BLUE}🌊 Wave 3: 3タスク並行実行（#4, #6完了後）${NC}"
echo "  - Issue #5:  ローカル開発サーバーセットアップ"
echo "  - Issue #7:  Service Worker実装"
echo "  - Issue #14: ビルドスクリプト作成"
echo ""

npx miyabi agent run codegen --issue=5 &
PID8=$!
npx miyabi agent run codegen --issue=7 &
PID9=$!
npx miyabi agent run codegen --issue=14 &
PID10=$!

wait $PID8 $PID9 $PID10
echo -e "${GREEN}✅ Wave 3 完了${NC}"
echo ""

# Wave 4: Issue #7完了後
echo -e "${BLUE}🌊 Wave 4: 1タスク実行（#7完了後）${NC}"
echo "  - Issue #8: オフライン対応とテスト"
echo ""

npx miyabi agent run review --issue=8
echo -e "${GREEN}✅ Wave 4 完了${NC}"
echo ""

# Wave 5: Wave 3, 4完了後
echo -e "${BLUE}🌊 Wave 5: 2タスク並行実行（#7, #8, #14完了後）${NC}"
echo "  - Issue #11: インストール手順書作成"
echo "  - Issue #15: GitHub Releasesセットアップ"
echo ""

npx miyabi agent run codegen --issue=11 &
PID11=$!
npx miyabi agent run deploy --issue=15 &
PID12=$!

wait $PID11 $PID12
echo -e "${GREEN}✅ Wave 5 完了${NC}"
echo ""

# Wave 6: Wave 5完了後
echo -e "${BLUE}🌊 Wave 6: 1タスク実行（#10, #11, #14完了後）${NC}"
echo "  - Issue #16: 配布用ZIPパッケージ作成"
echo ""

npx miyabi agent run deploy --issue=16
echo -e "${GREEN}✅ Wave 6 完了${NC}"
echo ""

# Wave 7: すべてのコード実装完了後
echo -e "${BLUE}🌊 Wave 7: 1タスク実行（#5, #7, #8, #14完了後）${NC}"
echo "  - Issue #17: セキュリティ監査"
echo ""

npx miyabi agent run review --issue=17
echo -e "${GREEN}✅ Wave 7 完了${NC}"
echo ""

# Wave 8: すべて完了後
echo -e "${BLUE}🌊 Wave 8: 最終タスク実行（すべて完了後）${NC}"
echo "  - Issue #18: 最終動作確認とリリース"
echo ""

npx miyabi agent run deploy --issue=18
echo -e "${GREEN}✅ Wave 8 完了${NC}"
echo ""

echo -e "${YELLOW}🎉 全Wave完了！v1.0.0リリース準備完了${NC}"
echo ""
echo "次のステップ:"
echo "  1. GitHub Releasesを確認"
echo "  2. 配布用ZIPをダウンロードして動作確認"
echo "  3. GitHub Pagesデプロイ確認"
echo ""
echo "🌸 Miyabi Framework - 自律型開発完了"
