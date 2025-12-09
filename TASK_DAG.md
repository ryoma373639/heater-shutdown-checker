# タスクDAG（Directed Acyclic Graph）- heater-shutdown-checker

## Miyabi Coordinator Agentによるタスク分解と並行実行プラン

### 依存関係グラフ（Mermaid）

```mermaid
graph TD
    Start[マスターIssue #2] --> Level0A[#3: プロジェクト構造整理]
    Start --> Level0B[#9: アイコン・画像リソース準備]
    Start --> Level0C[#10: README.md作成]
    Start --> Level0D[#12: ユーザーガイド作成]
    Start --> Level0E[#13: 開発者向けドキュメント作成]

    Level0A --> Level1A[#4: package.json設定とスクリプト整備]
    Level0A --> Level1B[#6: manifest.json作成]

    Level1A --> Level2A[#5: ローカル開発サーバーセットアップ]
    Level1A --> Level2B[#14: ビルドスクリプト作成]
    Level1B --> Level2C[#7: Service Worker実装]

    Level2C --> Level3A[#8: オフライン対応とテスト]

    Level2C --> Level4A[#11: インストール手順書作成]
    Level3A --> Level4A
    Level2B --> Level4B[#15: GitHub Releasesセットアップ]

    Level2B --> Level5A[#16: 配布用ZIPパッケージ作成]
    Level0C --> Level5A
    Level4A --> Level5A

    Level2A --> Level6A[#17: セキュリティ監査]
    Level2C --> Level6A
    Level3A --> Level6A
    Level2B --> Level6A

    Level5A --> Level7A[#18: 最終動作確認とリリース]
    Level4B --> Level7A
    Level6A --> Level7A

    classDef level0 fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef level1 fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef level2 fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef level3 fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px
    classDef level4 fill:#fce4ec,stroke:#880e4f,stroke-width:2px
    classDef level5 fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    classDef level6 fill:#ffebee,stroke:#b71c1c,stroke-width:2px
    classDef level7 fill:#c8e6c9,stroke:#2e7d32,stroke-width:3px

    class Level0A,Level0B,Level0C,Level0D,Level0E level0
    class Level1A,Level1B level1
    class Level2A,Level2B,Level2C level2
    class Level3A level3
    class Level4A,Level4B level4
    class Level5A level5
    class Level6A level6
    class Level7A level7
```

## 並行実行プラン

### Wave 1（5タスク並行）- 依存なし
**実行可能時刻: 即座**
- ✅ **Issue #3**: プロジェクト構造整理 `[agent:codegen, P0-Critical]`
- ✅ **Issue #9**: アイコン・画像リソース準備 `[agent:codegen, P2-Medium]`
- ✅ **Issue #10**: README.md作成 `[agent:codegen, P1-High]`
- ✅ **Issue #12**: ユーザーガイド作成 `[agent:codegen, P2-Medium]`
- ✅ **Issue #13**: 開発者向けドキュメント作成 `[agent:codegen, P3-Low]`

**推定時間**: 30-45分（並行実行）

---

### Wave 2（2タスク並行）- Wave 1の#3完了後
**実行可能時刻: Wave 1の#3完了後**
- ⏳ **Issue #4**: package.json設定とスクリプト整備 `[agent:codegen, P0-Critical]`
  - 依存: #3
- ⏳ **Issue #6**: manifest.json作成 `[agent:codegen, P0-Critical]`
  - 依存: #3

**推定時間**: 20-30分（並行実行）

---

### Wave 3（3タスク並行）- Wave 2完了後
**実行可能時刻: Wave 2完了後**
- ⏳ **Issue #5**: ローカル開発サーバーセットアップ `[agent:codegen, P1-High]`
  - 依存: #4
- ⏳ **Issue #7**: Service Worker実装 `[agent:codegen, P0-Critical]`
  - 依存: #6
- ⏳ **Issue #14**: ビルドスクリプト作成 `[agent:codegen, P1-High]`
  - 依存: #4

**推定時間**: 30-45分（並行実行）

---

### Wave 4（1タスク）- Wave 3の#7完了後
**実行可能時刻: Wave 3の#7完了後**
- ⏳ **Issue #8**: オフライン対応とテスト `[agent:review, P1-High]`
  - 依存: #7

**推定時間**: 15-20分

---

### Wave 5（2タスク並行）- Wave 4完了後
**実行可能時刻: Wave 3の#14, Wave 4の#8完了後**
- ⏳ **Issue #11**: インストール手順書作成 `[agent:codegen, P0-Critical]`
  - 依存: #7, #8
- ⏳ **Issue #15**: GitHub Releasesセットアップ `[agent:deploy, P1-High]`
  - 依存: #14

**推定時間**: 20-30分（並行実行）

---

### Wave 6（1タスク）- Wave 5の#11完了後
**実行可能時刻: Wave 2の#10, Wave 3の#14, Wave 5の#11完了後**
- ⏳ **Issue #16**: 配布用ZIPパッケージ作成 `[agent:deploy, P0-Critical]`
  - 依存: #14, #10, #11

**推定時間**: 15-20分

---

### Wave 7（1タスク）- すべてのコード実装完了後
**実行可能時刻: Wave 3, 4のコード実装完了後**
- ⏳ **Issue #17**: セキュリティ監査 `[agent:review, P1-High, special:security]`
  - 依存: #5, #7, #8, #14

**推定時間**: 20-30分

---

### Wave 8（1タスク）- すべて完了後
**実行可能時刻: すべてのIssue完了後**
- ⏳ **Issue #18**: 最終動作確認とリリース `[agent:deploy, P0-Critical]`
  - 依存: すべて

**推定時間**: 30-45分

---

## クリティカルパス（最長経路）

```
#3 → #4 → #7 → #8 → #11 → #16 → #17 → #18
```

**クリティカルパス所要時間**: 約2.5〜3.5時間

**全タスク総時間（並行実行なし）**: 約9〜14時間
**並行実行時の推定時間**: 約2.5〜3.5時間（約70%短縮）

---

## Agent割り当て

### CodeGen Agent（11タスク）
- #3, #4, #5, #6, #7, #9, #10, #11, #12, #13, #14

### Review Agent（2タスク）
- #8, #17

### Deploy Agent（3タスク）
- #15, #16, #18

---

## 優先順位別タスク

### P0-Critical（最優先）
- #3, #4, #6, #11, #16, #18

### P1-High
- #5, #7, #8, #10, #14, #15, #17

### P2-Medium
- #9, #12

### P3-Low
- #13

---

## 実行推奨順序

1. **即座に実行**: Wave 1の5タスク（すべて並行可能）
2. **#3完了後**: Wave 2の2タスク（並行可能）
3. **#4と#6完了後**: Wave 3の3タスク（並行可能）
4. **段階的に実行**: Wave 4〜8（依存関係に従う）

---

## Miyabi Agent実行コマンド

### Wave 1（並行実行）
```bash
npx miyabi agent run codegen --issue=3 &
npx miyabi agent run codegen --issue=9 &
npx miyabi agent run codegen --issue=10 &
npx miyabi agent run codegen --issue=12 &
npx miyabi agent run codegen --issue=13 &
```

### Wave 2（#3完了後）
```bash
npx miyabi agent run codegen --issue=4 &
npx miyabi agent run codegen --issue=6 &
```

### 以降、DAGに従って順次実行

---

🌸 **Miyabi Coordinator Agent**による自動タスク分解・並行実行プラン
