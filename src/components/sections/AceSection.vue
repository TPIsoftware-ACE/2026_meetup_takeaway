<script setup>
import ReadinessCheck from '../widgets/ReadinessCheck.vue'
import ServiceFinder from '../widgets/ServiceFinder.vue'
</script>

<template>
  <section class="chapter" id="ace">
  <div class="wrap">
    <div class="chap-head">
      <div class="eyebrow">ChatGPT Business &amp; ACE 顧問服務</div>
      <h2 class="h2">從「大家開始用 AI」<br>到「企業真正用出成果」</h2>
      <p class="lede">把已經發生的 AI 使用，轉成可管理、可驗證、可擴散的企業能力。</p>
    </div>

    <div class="block">
      <div class="block-head">
        <h3 class="h3">企業 AI 落地自評</h3>
        <p>你的公司可能已經在使用 AI，只是你還看不到。勾選目前做得到的項目。</p>
      </div>
      <ReadinessCheck />
    </div>

    <div class="block">
      <div class="block-head">
        <h3 class="h3">成功落地需要同時解決兩件事</h3>
        <p>平台讓企業有地方用 AI；ACE 讓企業真的用出成果。</p>
      </div>
      <div class="ace-cols">
        <div class="card" style="display:grid;gap:10px;align-content:start">
          <span class="eyebrow">ChatGPT Business / Enterprise</span>
          <b style="font-size:18px">企業安全環境底座</b>
          <ul>
            <li>正式、可管理的團隊 AI Workspace</li>
            <li>使用者、帳務與權限管理</li>
            <li>SAML SSO、MFA 等工作區能力</li>
            <li>商業資料預設不用於模型訓練</li>
            <li>從個人使用走向共用脈絡與流程</li>
          </ul>
          <p class="solve">解決：企業在哪裡安全合規地使用 AI？</p>
        </div>
        <div class="plus" aria-hidden="true">+</div>
        <div class="card" style="display:grid;gap:10px;align-content:start;border-color:var(--ai)">
          <span class="eyebrow">TPIsoftware ACE</span>
          <b style="font-size:18px">企業 AI 導入推進夥伴</b>
          <ul>
            <li>導入策略</li>
            <li>能力建立</li>
            <li>場景落地</li>
            <li>持續陪跑</li>
            <li>成效治理</li>
          </ul>
          <p class="solve">解決：如何讓 AI 深度融入工作流程？</p>
        </div>
      </div>
      <div class="phases" id="ace-phases">
        <div><span class="mono">ALIGN</span><b>對齊</b><span>確認目標與優先工作</span></div>
        <div><span class="mono">ENABLE</span><b>賦能</b><span>角色化學習與安全使用</span></div>
        <div><span class="mono">DISCOVER</span><b>探索</b><span>找出高價值 Workflow</span></div>
        <div><span class="mono">STANDARDIZE</span><b>標準化</b><span>Prompt、Template、GPT、SOP</span></div>
        <div><span class="mono">GOVERN</span><b>治理</b><span>資料邊界、Review、Owner</span></div>
        <div><span class="mono">SCALE</span><b>擴展</b><span>工具、API、Agent、Integration</span></div>
      </div>
      <p class="small">在大型金控的經驗：最佳實踐往往從「先開始」才長出來，Start → Adjust → Learn。ACE 已累積 3,000+ 課程學員。</p>
    </div>

    <div class="block" id="ace-proof">
      <div class="block-head">
        <h3 class="h3">成果可以量化，才能被驗證</h3>
        <p>找出場景 → 實際驗證 → 衡量成果 → 複製擴散。方法可以被驗證，才有機會被複製。</p>
      </div>
      <div class="grid g2">
        <div class="card metric"><span class="eyebrow">法務標案審閱</span><span class="num big">1 小時<small>→</small>30 秒</span><span class="small">時間節省 99.17%　速度提升 120 倍</span></div>
        <div class="card metric"><span class="eyebrow">專案經理會議摘要</span><span class="num big">1 小時<small>→</small>5 分鐘</span><span class="small">時間節省 91.67%　效率提升 12 倍</span></div>
      </div>
    </div>

    <div class="block" id="ace-finder">
      <div class="block-head">
        <h3 class="h3">哪一種 ACE 服務適合你的企業？</h3>
        <p>回答兩個問題，看看該從策略、培訓、陪跑還是彈性服務切入。</p>
      </div>
      <ServiceFinder />
    </div>
  </div>
</section>
</template>
