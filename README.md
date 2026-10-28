# 2026 Meetup Takeaway

「拒絕無效導入！OpenAI Select Partner 帶你打造安全 AI 工作流」Meetup 活動重點整理網頁。

把活動簡報（Keynote 與三個案例、ACE 顧問服務）拆成可以點、可以試的互動版本，方便參加或錯過活動的人把重點帶回公司。

**網站：** https://tpisoftware-ace.github.io/2026_meetup_takeaway/

## 內容

| 章節 | 主題 | 互動 |
| --- | --- | --- |
| 總覽 | 活動主線與三條共同主軸 | 章節導覽 |
| Keynote | Start Small. Work Smarter. Scale What Works. | 導入階段切換、試點條件清單、工具選擇 |
| 案例一 | 從對話到工作應用 | 工作流拆解、Human Review 練習、角色化會議紀錄 |
| 案例二 | 從個人工具到組織規格化應用 | 職能流程、效益試算、Workflow 資產卡 |
| 案例三 | 用 Codex 把企業文件轉成互動介面 | 介面類型示範、名詞探索 |
| ACE | ChatGPT Business 與 ACE 顧問服務 | 落地自評、服務選擇器 |

## 專案結構

```
.
├── index.html                      # 整個網站（HTML、CSS、JS 都在這一個檔案）
└── .github/workflows/deploy.yml    # 推送到 main 時自動部署到 GitHub Pages
```

網站是單一靜態 HTML，沒有建置步驟與相依套件；Logo 以 base64 內嵌，字型由 Google Fonts 載入。

## 本機預覽

直接用瀏覽器開啟 `index.html`，或啟動一個本機伺服器：

```bash
python -m http.server 8000
```

再開啟 http://localhost:8000 。

## 部署

推送到 `main` 分支後，GitHub Actions 會自動把 `index.html` 部署到 GitHub Pages；也可以在 Actions 頁籤手動執行 **Deploy to GitHub Pages**。

第一次使用前，請到 **Settings → Pages → Build and deployment → Source** 選擇 **GitHub Actions**。

## 設計規範

- 最小字級 14px
- 色彩：紫＝AI 負責、琥珀＝人負責、藍＝資料來源、墨色＝產出與下一步
- 支援淺色／深色模式與手機版面

## 聯絡

TPIsoftware ACE Team · [ace@tpisoftware.com](mailto:ace@tpisoftware.com)
