# 2026 Meetup Takeaway

**拒絕無效導入！OpenAI Select Partner 帶你打造安全 AI 工作流**

TPIsoftware × OpenAI Select Partner「Meetup 技術小聚」的活動重點整理網站。把 Keynote、三個企業案例與 ACE 顧問服務的簡報內容，拆成可以點、可以試的互動版本，讓參加或錯過活動的人都能把重點帶回公司。

🔗 **網站：** https://tpisoftware-ace.github.io/2026_meetup_takeaway/

---

## 技術架構

| 項目 | 使用 |
| --- | --- |
| 前端框架 | [Vue 3](https://vuejs.org/)（Composition API、`<script setup>`） |
| 建置工具 | [Vite](https://vite.dev/) |
| 單元測試 | [Vitest](https://vitest.dev/) + [Vue Test Utils](https://test-utils.vuejs.org/) + jsdom |
| 部署 | GitHub Actions → GitHub Pages |

網站是純前端靜態頁，沒有後端與外部 API；字型由 Google Fonts 載入。

## 專案結構

```
.
├── index.html                    # Vite 進入點（頁面標題、字型）
├── src/
│   ├── main.js                   # 建立 Vue App
│   ├── App.vue                   # 組合頁首、各章節、頁尾；啟用捲動淡入
│   ├── assets/                   # Logo、OpenAI Select Partner 標章、封面主視覺（桌面／手機）
│   ├── styles/main.css           # 全站樣式（色彩 token、深色模式、版面）
│   ├── data/content.js           # 互動區塊的內容資料（文字取自簡報）
│   ├── utils/logic.js            # 純邏輯：效益試算、練習判定、篩選、自評等級…
│   ├── composables/
│   │   ├── useSectionProgress.js # 閱讀進度：目前章節、各段填滿比例（導覽與進度條共用）
│   │   ├── useScrollEdges.js     # 導覽左右兩端是否還有項目（左右箭頭）
│   │   ├── useIdle.js            # 使用者靜置偵測（回到頁首按鈕變淡）
│   │   └── useReveal.js          # 捲動進入畫面時淡入
│   └── components/
│       ├── layout/               # TheHeader、TheFooter、BackToTop
│       ├── sections/             # 依簡報順序的八個章節
│       ├── widgets/              # 14 個互動元件
│       └── common/TabList.vue    # 共用分頁按鈕（v-model）
├── tests/                        # 單元測試
├── vite.config.js                # Vite 與 Vitest 設定
└── .github/workflows/deploy.yml  # 測試 → 建置 → 部署
```

### 章節與互動元件

| 章節 | 元件 | 互動 |
| --- | --- | --- |
| 總覽 `HeroSection` `ThemesSection` | — | 活動主線、三條共同主軸、章節導覽 |
| Keynote `KeynoteSection` | `StageExplorer` | 切換四個導入階段 |
| | `PilotChecklist` | 勾選試點條件，看準備程度 |
| | `ToolPicker` | 依工作類型看建議工具 |
| 案例一 `CaseOneSection` | `WorkflowStepper` | 一步步走完六段工作流 |
| | `ReviewQuiz` | Human Review 練習：選檢查點、揭曉原文 |
| | `RoleNotes` | 切換角色看不同版本的會議紀錄 |
| 案例二 `CaseTwoSection` | `FunctionCases` | PM／SA／法務三種流程重設計 |
| | `SavingsCalculator` | 依次數與人數試算每月省下的時間 |
| | `WorkflowBuilder` | 填寫七個欄位產生 Workflow 資產卡、複製文字 |
| 案例三 `CaseThreeSection` | `QuestionFlip` | Before／After 換個問題 |
| | `InterfaceTypes` | 決策、關係、探索三種介面示範 |
| | `GlossaryExplorer` | 依分類與關鍵字查詢活動名詞 |
| ACE `AceSection` | `ReadinessCheck` | 企業 AI 落地自評 |
| | `ServiceFinder` | 回答兩題找到適合的 ACE 服務 |

## 開發

需要 Node.js 20.19 以上（建議 24）。

```bash
npm install
```

```bash
npm run dev
```

開發伺服器啟動後開啟終端機顯示的網址（預設 http://localhost:5173）。

| 指令 | 用途 |
| --- | --- |
| `npm run dev` | 開發模式（熱更新） |
| `npm test` | 執行全部單元測試 |
| `npm run test:watch` | 監看模式，存檔即重跑測試 |
| `npm run build` | 建置正式版到 `dist/` |
| `npm run preview` | 本機預覽建置結果 |

### 修改內容

- **文字與選項**：互動區塊的內容集中在 `src/data/content.js`；靜態段落直接改 `src/components/sections/` 內對應的章節。
- **計算與判定規則**：改 `src/utils/logic.js`，並同步更新 `tests/logic.test.js`。
- **樣式**：`src/styles/main.css`。色彩以 CSS 變數定義，淺色與深色模式各一組。

## 測試

```bash
npm test
```

| 測試檔 | 範圍 |
| --- | --- |
| `logic.test.js` | 效益試算、時間格式、練習判定、名詞篩選、自評等級、服務選擇、資產卡文字、閱讀進度 |
| `content.test.js` | 內容資料一致性；導覽與段落連結的錨點都存在 |
| `app.test.js` | 章節順序、標題、Logo 與合作夥伴標章、導覽與閱讀進度條、頁尾聯絡資訊、`TabList`、`BackToTop`、composable |
| `keynote.test.js` | `StageExplorer`、`PilotChecklist`、`ToolPicker` |
| `caseOne.test.js` | `WorkflowStepper`、`ReviewQuiz`、`RoleNotes` |
| `caseTwo.test.js` | `FunctionCases`、`SavingsCalculator`、`WorkflowBuilder`（含剪貼簿） |
| `caseThree.test.js` | `QuestionFlip`、`InterfaceTypes`、`GlossaryExplorer` |
| `ace.test.js` | `ReadinessCheck`、`ServiceFinder` |

## 部署

推送到 `main` 後，GitHub Actions 依序執行：

1. `npm ci` 安裝相依套件
2. `npm test` 執行單元測試（**任何一項失敗就不會部署**）
3. `npm run build` 建置
4. 上傳 `dist/` 並部署到 GitHub Pages

對 `main` 開 Pull Request 時只會跑測試與建置，不會部署。也可以在 Actions 頁籤手動執行 **Test and Deploy to GitHub Pages**。

> 第一次使用前，請到 repo 的 **Settings → Pages → Build and deployment → Source** 選擇 **GitHub Actions**。

`vite.config.js` 的 `base` 設為 `./`，資源以相對路徑載入，部署在 `/2026_meetup_takeaway/` 子路徑或改 repo 名稱都不需要調整。

## 設計規範

- 最小字級 14px（含手機版與 SVG 圖示文字）
- 色彩語意：紫＝AI 負責、琥珀＝人負責、藍＝資料來源、墨色＝產出與下一步
- 手機版導覽放不下時，被遮住的那一側出現箭頭與淡出效果，點箭頭可左右捲動
- 捲動超過 400px 時右下角出現「回到頁首」；螢幕小於 765px 時，靜置 1 秒後按鈕降為 30% 不透明度，避免干擾閱讀
- 封面主視覺：螢幕小於 765px 改用直式手機版圖片
- 頁首下方的閱讀進度條：每段對應一個章節（長度依章節篇幅），已讀完的章節填滿，目前章節依捲動進度填入；滑鼠移上顯示章節名稱，點擊可跳段
- 支援淺色／深色模式與手機版面；尊重系統「減少動態效果」設定

## 聯絡

TPIsoftware ACE Team · [ace@tpisoftware.com](mailto:ace@tpisoftware.com)
