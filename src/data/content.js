/* 互動區塊使用的內容資料。文字取自活動簡報，修改時請保持與簡報一致。 */

export const NAV = [
  { id: 'overview', label: '總覽' },
  { id: 'keynote', label: 'Keynote' },
  { id: 'case1', label: '案例一' },
  { id: 'case2', label: '案例二' },
  { id: 'case3', label: '案例三' },
  { id: 'ace', label: 'ACE' }
]

/* ---------- Keynote ---------- */
export const STAGES = [
  { n: '自己使用', zh: '我知道怎麼用 AI', scope: '個人', look: '寫作、研究、分析、會議整理，個人生產力先提升。', ask: '哪些工作最困擾我？AI 能幫我省下哪一段時間？', next: '把自己好用的做法整理成別人看得懂的步驟。' },
  { n: '實務分享', zh: '分享成功經驗、Agent', scope: '團隊', look: '把成功經驗和做好的 Agent 分享出去，讓同事照著用。', ask: '這套方法，其他人能不能跟著做？', next: '挑出團隊最有共識的 3–5 個流程。' },
  { n: '團隊工作流程', zh: 'AI 進入工作流程', scope: '部門', look: 'AI 成為流程中固定的一段，有明確的資料邊界、Human Review 與 Owner。', ask: 'AI 負責哪一段？誰確認？誰維護？', next: '衡量 Usage、Time Saved、Adoption 與 Business Value。' },
  { n: '營運模式', zh: '人與 AI 角色互動升級', scope: '企業', look: '新型態工作流成為組織的運作方式，成熟的 Workflow 沉澱成組織資產。', ask: '哪些工作方法值得被更多單位複用？', next: '讓種子在各單位持續長出可複用的 Workflow。' }
]

export const PILOT_ITEMS = [
  { t: '選一個部門', d: '有主管支持、團隊文化願意嘗試' },
  { t: '從小團隊開始', d: '建議 5–20 人' },
  { t: '找 3–5 個流程', d: '挑團隊最有共識的工作' },
  { t: '設定最小邊界', d: '資料邊界、Human Review、Owner' },
  { t: 'Review 完成工作的效率與效果', d: 'Usage、Time Saved、Adoption、Business Value' }
]

export const PILOT_MSGS = [
  '還沒開始也沒關係，先選一個主管支持的部門。',
  '有起點了，接著把範圍縮小到 5–20 人。',
  '團隊有了，找出 3–5 個大家最有共識的流程。',
  '流程有了，先定好資料邊界、誰 Review、誰負責。',
  '只差最後一步：定義怎麼 Review 效率與效果。',
  '試點條件齊全，可以開始做快速、低風險的驗證。'
]

export const TOOLS = [
  { id: 'know', label: '日常知識工作', en: 'Everyday Knowledge Work', work: 'Writing、Research、Analysis、Meeting', tool: 'ChatGPT' },
  { id: 'code', label: '程式開發', en: 'Coding / Development', work: 'Coding、Review、Automation', tool: 'Codex / AI Coding Tools' },
  { id: 'local', label: '私有／地端', en: 'Private / Local', work: 'Local Data、Specific Requirements', tool: 'OrientAI / Local AI' },
  { id: 'sys', label: '系統流程', en: 'System Workflow', work: 'CRM、ERP、BPM、Automated Actions', tool: 'API / Agent / Integration' }
]

/* ---------- 案例一 ---------- */
export const WHO = { info: '資料', ai: 'AI 負責', human: '人負責', action: '產出' }

export const WF = [
  { k: 'Context', who: 'info', t: '10:00 UAT 進度會議', items: ['會議時間與目的', '與會者是誰'], note: '先看清楚這是一條什麼樣的工作：一場要確認 UAT 進度的會議。' },
  { k: 'Input', who: 'info', t: '散在四處的資料', items: ['會議邀請', 'Email', 'Teams 訊息', 'SharePoint 文件'], note: '議程在 Calendar、要求在 Email、隱性待辦在 Teams、背景數字在週報。' },
  { k: 'AI Task', who: 'ai', t: '整理與比較', items: ['整理背景', '找出進度風險', '標示待確認事項'], note: 'AI 負責搜尋、整理、比較、找風險，把人腦最耗能的拼圖工作接過去。' },
  { k: '人為判斷', who: 'human', t: '確認與決策', items: ['確認事實', '期限與責任', '判斷哪些不能承諾', '決定會中說法'], note: 'AI 可以加速工作，但不能轉移責任。這一段只能由人做。' },
  { k: 'Output', who: 'action', t: '一頁會前包', items: ['5 分鐘讀完', '附建議提問'], note: '好的 Output 不是內容更多，而是更接近下一個 Action。' },
  { k: 'Next Action', who: 'action', t: '帶著問題進會議', items: ['知道要問什麼', '知道要確認什麼'], note: '流程的終點是下一個動作，而不是一份文件。' }
]

export const CHECKS = [
  { k: 'Fact', q: '有沒有來源？' },
  { k: 'Owner', q: '誰真的承諾？' },
  { k: 'Deadline', q: '已確認還是目標？' },
  { k: 'Decision', q: '已決議或討論中？' },
  { k: 'Commitment', q: '能不能對外說？' }
]

export const QZ = [
  { ai: '「IT 已確認週五完成資料修正。」', orig: '「我們目標看看能不能週五前完成。」', ans: ['Deadline', 'Commitment'], why: '「目標」被寫成「已確認」。期限變成了承諾，如果這句被帶進會議對外說，IT 就背上了沒有做過的承諾。' },
  { ai: '「客戶同意上線時程延後兩週。」', orig: '「客戶說會回去內部討論延後的可能。」', ans: ['Decision', 'Commitment'], why: '還在討論的事被寫成已決議，而且多了一個原文沒有的「兩週」。這種句子最容易在會議上被當成共識。' },
  { ai: '「資料轉換由 Amy 負責，下週三交付。」', orig: '「轉換這段可能要請 Amy 那邊幫忙看看，時間再約。」', ans: ['Owner', 'Deadline'], why: '「可能請她看看」不等於她承接了這件事，交付日期也是 AI 補上的。負責人和期限都要回到本人確認。' }
]

export const ROLE_NOTES = [
  { id: 'pm', label: 'PM／窗口', title: 'UAT 進度會議 · PM 版', purpose: '會議目的：推進與追蹤', rows: [
    ['Action Items', '資料修正、UAT 第二輪測試排程'],
    ['Owner', '資料修正 → IT', true],
    ['Deadline', '週五為目標，尚未確認', true],
    ['卡點與下一步', '測試資料不完整 → 會後與 IT 確認時程']
  ] },
  { id: 'boss', label: '主管', title: 'UAT 進度會議 · 主管版', purpose: '會議目的：判斷與協調', rows: [
    ['風險', '資料修正若延後，UAT 第二輪跟著延'],
    ['需決策事項', '是否先用部分資料開始測試'],
    ['跨單位卡點', 'IT 與業務單位對「完成」的定義不一致'],
    ['升級議題', '目前沒有']
  ] },
  { id: 'doer', label: '執行者', title: 'UAT 進度會議 · 執行者版', purpose: '會議目的：知道要做什麼', rows: [
    ['我負責的事', '準備第二輪測試案例'],
    ['依賴對象', 'IT 完成資料修正'],
    ['交付物與時間', '測試案例清單，資料確認後排定時間']
  ] },
  { id: 'legal', label: '法遵／資安', title: 'UAT 進度會議 · 法遵／資安版', purpose: '會議目的：確認邊界', rows: [
    ['承諾', '會中沒有對客戶做出期限承諾'],
    ['敏感資訊', '測試資料是否含真實客戶資料', true],
    ['需確認事項', '「週五完成」是目標，不是承諾'],
    ['來源依據', 'Teams 訊息、SharePoint 週報']
  ] }
]

/* ---------- 案例二 ---------- */
export const FN_TABS = [
  { id: 'pm', label: '專案經理' },
  { id: 'sa', label: '系統分析' },
  { id: 'legal', label: '法務' }
]

export const FN = {
  pm: { title: '從「會議紀錄」到「推進工作」', before: 'Meeting → 逐字稿 → 人工整理 → 會議紀錄，流程在紀錄寫完時就結束。',
    flow: [['info', 'Meeting', '會議'], ['ai', 'AI', 'AI 摘要'], ['human', 'PM', 'PM Review'], ['human', '客戶', '客戶確認會議摘要'], ['action', 'Next', '專案追蹤']],
    beforeMin: 60, afterMin: 5, pct: '91.67%', x: '12 倍', focus: '專案經理專心於時程規劃與需求釐清，更專注在會議本身，而不是筆記。' },
  sa: { title: '從「找文件」到「需求分析」', before: '在多份需求文件與訪談紀錄之間來回翻找、整理。',
    flow: [['info', 'Input', '需求文件／需求訪談'], ['ai', 'AI', '整理需求：分類與對照'], ['ai', 'AI', '找出衝突、缺口與未知'], ['human', 'SA', 'SA Review：技術與語意'], ['action', 'Output', '需求清單／訪談問題']],
    focus: '把文件轉成知識庫，降低翻找與整理的負擔；SA 專注在功能分析與跨部門溝通。' },
  legal: { title: '從「人工閱讀」到「風險 Review」', before: '法務逐份閱讀標案與合約，再自己整理重點。',
    flow: [['info', 'Input', '標案／合約'], ['ai', 'AI', 'AI 審閱'], ['ai', 'AI', '產出摘要'], ['human', '法務', '法務 Review'], ['ai', 'AI', '撰寫給相關單位的 email']],
    beforeMin: 60, afterMin: 0.5, pct: '99.17%', x: '120 倍', focus: 'AI 處理高耗時、可標準化的條款整理；法務專注在複雜的風險判斷與最終決策。' }
}

/** 單次節省的分鐘數 */
export const SAVE = { pm: 55, legal: 59.5 }

export const CALC_TABS = [
  { id: 'pm', label: 'PM 會議摘要（60 → 5 分鐘）' },
  { id: 'legal', label: '法務標案審閱（60 分鐘 → 30 秒）' }
]

export const FIELDS = [
  { k: 'purpose', en: 'Purpose', zh: '解決什麼問題？', warn: '沒有目的，別人不知道什麼時候該用這個 Workflow。' },
  { k: 'user', en: 'User', zh: '誰可以使用？', warn: '不知道誰能用，就沒辦法擴散給下一個人。' },
  { k: 'data', en: 'Data', zh: '有哪些資料？', warn: '沒寫資料來源，別人做不出相同的結果。' },
  { k: 'ai', en: 'AI Role', zh: 'AI 負責什麼？', warn: 'AI 的範圍不清楚，人就不知道要檢查什麼。' },
  { k: 'review', en: 'Human Review', zh: '人為確認什麼？', warn: '沒有人為確認，出錯時責任會落空。' },
  { k: 'output', en: 'Output', zh: '產出什麼？', warn: '沒定義產出，每個人做出來的東西都不一樣。' },
  { k: 'owner', en: 'Owner', zh: '誰維護？', warn: '沒有維護者，工具一改版，這個方法就會失傳。' }
]

export const PRESETS = {
  pm: { label: '範例：PM 會議摘要', name: 'PM 會議摘要', purpose: '把會議內容變成可追蹤的下一步', user: '專案經理、專案成員', data: '會議逐字稿、專案時程表', ai: '產出會議摘要與 Action Items 草稿', review: 'PM 確認內容，再請客戶確認摘要', output: '客戶確認版會議摘要、專案追蹤項目', owner: 'PMO 指定的種子成員（範例）' },
  legal: { label: '範例：法務標案審閱', name: '法務標案審閱', purpose: '縮短標案與合約的初審時間', user: '法務人員', data: '標案文件、合約條款', ai: '審閱條款、產出摘要、草擬給相關單位的 email', review: '法務判斷複雜風險並做最終決策', output: '條款摘要、通知相關單位的 email', owner: '法務部指定窗口（範例）' },
  blank: { label: '空白卡', name: '' }
}

/* ---------- 案例三 ---------- */
export const QUESTIONS = {
  before: '我要怎麼把這份文件整理好？',
  after: '使用者到底想用這份資訊做什麼？'
}

export const IFACE_TABS = [
  { id: 'dec', label: '我要做決定' },
  { id: 'rel', label: '我要理解關係' },
  { id: 'exp', label: '我要找到資訊' }
]

export const TERMS = [
  { t: 'Shadow AI', c: '現象', d: '員工早已在使用外部或個人 AI 工具，企業卻還沒納管。要看清楚 Who、What、Data、Where 四件事。', src: '開場、ACE', href: '#ace' },
  { t: '急著 PoC，沒想過 Scale', c: '現象', d: '先回答「到底要測什麼？測完之後呢？」，PoC 才有往下擴大的路。', src: '開場', href: '#overview' },
  { t: 'Start Small', c: '方法', d: '先從 5 個人、5–20 人的小團隊開始，找 3–5 個最有共識的流程。', src: 'Keynote', href: '#k-pilot' },
  { t: '最小邊界', c: '治理', d: '試點前先定好三件事：資料邊界、Human Review、Owner。', src: 'Keynote', href: '#k-pilot' },
  { t: 'Operating Model', c: '方法', d: '導入的第四階段：人與 AI 的角色互動升級，新型態工作流成為組織運作方式。', src: 'Keynote', href: '#keynote' },
  { t: 'Context → Next Action', c: '方法', d: '一條工作拆成 Context、Input、AI Task、人為判斷、Output、Next Action，再決定 AI 負責哪一段。', src: '案例一', href: '#c1-flow' },
  { t: 'Human Review', c: '治理', d: '不只是看錯字，而是確認事實、期限、責任、決議與承諾。AI 可以加速工作，但不能轉移責任。', src: '案例一、案例二', href: '#c1-review' },
  { t: 'Role-aware Output', c: '方法', d: '先問「誰要看？」再決定產出格式。PM、主管、執行者、法遵需要的版本不同。', src: '案例一', href: '#case1' },
  { t: 'Citation / Traceability', c: '治理', d: '決策、期限、承諾與負責人要能回到來源；沒有明確來源就標「需確認」。', src: '案例一', href: '#case1' },
  { t: '可複用的 Workflow', c: '方法', d: '擴散的不是 Prompt 或某個人做的工具，而是能被更多人重新使用的工作方法。', src: '案例二', href: '#c2-asset' },
  { t: '種子', c: '方法', d: '不只是會用 AI 的人，而是能找到問題、重設流程、推動複用的人。', src: '案例二', href: '#c2-seed' },
  { t: 'Workflow Library', c: '治理', d: '成熟案例沉澱為組織數位資產，每張卡包含 Purpose、User、Data、AI Role、Human Review、Output、Owner。', src: '案例二', href: '#c2-asset' },
  { t: 'Decision Interface', c: '介面', d: '為「我要做決定」設計：只留決策需要的欄位，例如 Capability、Permission、Risk、Admin Role。', src: '案例三', href: '#case3' },
  { t: 'Relationship Interface', c: '介面', d: '為「我要理解關係」設計：讓設定之間的先後、依賴與控制關係一眼可見。', src: '案例三', href: '#case3' },
  { t: 'Exploration Interface', c: '介面', d: '為「我要找到資訊」設計：選擇 → 篩選 → 查找 → 查看細節，就像這個名詞探索。', src: '案例三', href: '#c3-explore' },
  { t: 'ChatGPT Business', c: '服務', d: '資料預設不用於模型訓練的團隊 AI Workspace，含使用者與帳務管理、SAML SSO、MFA 等能力。', src: 'Keynote、ACE', href: '#ace' },
  { t: 'ACE', c: '服務', d: 'AI Consulting & Enablement。以 ALIGN、ENABLE、DISCOVER、STANDARDIZE、GOVERN、SCALE 六個階段陪企業導入。', src: 'Keynote、ACE', href: '#ace-phases' },
  { t: '點數制服務', c: '服務', d: '彈性解決特定需求，只買需要的訪談、課程或 Office Hour。', src: 'ACE', href: '#ace-finder' }
]

export const CATS = ['全部', '現象', '方法', '治理', '介面', '服務']

/* ---------- ACE ---------- */
export const READINESS_GROUPS = [
  { title: 'Shadow AI 看得見嗎？', items: [
    { t: 'Who', d: '知道哪些員工或部門在用' },
    { t: 'What', d: '知道在用哪些外部或個人工具' },
    { t: 'Data', d: '知道是否輸入機密或客戶資料' },
    { t: 'Where', d: '知道應用在哪些核心流程' }
  ] },
  { title: '落地五大關鍵要素', items: [
    { t: '有人推', d: '有主管或種子負責推動' },
    { t: '有場景', d: '有明確要改善的工作' },
    { t: '有節奏', d: '有固定的推進節奏' },
    { t: '有指標', d: '能衡量節省時間、使用率等成果' },
    { t: '有治理', d: '已定義資料邊界、Review 與 Owner' }
  ] }
]

/** [門檻, 標題, 建議] */
export const RD = [
  [0, '先讓 AI 使用浮上檯面', '從盤點 Shadow AI 開始：誰在用、用什麼、放了什麼資料。方向還不清楚時，適合先做導入策略諮詢（A）。'],
  [3, '基礎正在成形', '挑一個主管支持的部門，用 5–20 人、3–5 個流程做試點，同時補上資料邊界與 Review 規則。'],
  [6, '可以開始擴散', '把試點成果量化，成熟的 Workflow 收進 Library，交給各單位的種子複用。'],
  [9, '準備好規模化', '可見度與落地機制都到位了，下一步是用 API、Agent 與系統整合把 Workflow 接進核心流程。']
]

export const F2 = {
  no: { q: '2. 現在最需要的是？', opts: [['A', '確認 AI 能不能導、該怎麼導'], ['B', '讓大家先有共同理解與基礎能力']] },
  yes: { q: '2. 目標的範圍是？', opts: [['C', '一個部門的明確目標，想持續推進'], ['D', '只需要特定的訪談、課程或 Office Hour']] }
}

export const SERVICES = [
  { L: 'A', k: '導入策略諮詢', b: '先確認方向', d: 'AI 能不能導、該怎麼導' },
  { L: 'B', k: '7 門培訓課程', b: '先讓大家懂 AI', d: '建立共同理解與基礎能力' },
  { L: 'C', k: '3 個月陪跑', b: '完整改善一個部門', d: '有明確部門目標，持續推進' },
  { L: 'D', k: '點數制服務', b: '彈性解決特定需求', d: '只買需要的訪談、課程、Office Hour' }
]
