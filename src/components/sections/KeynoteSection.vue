<script setup>
import StageExplorer from '../widgets/StageExplorer.vue'
import PilotChecklist from '../widgets/PilotChecklist.vue'
import ToolPicker from '../widgets/ToolPicker.vue'
</script>

<template>
  <section class="chapter" id="keynote">
  <div class="wrap">
    <div class="chap-head">
      <div class="eyebrow">Keynote · 產業趨勢實務</div>
      <h2 class="h2">Start Small. Work Smarter.<br>Scale What Works.</h2>
      <div class="speaker"><b>Henry Li</b><span>Head of Enterprise AI Advisory &amp; Solutions · TPIsoftware</span></div>
    </div>

    <div class="block" id="k-signals">
      <div class="block-head">
        <h3 class="h3">再大型的公司，也是從具體的工作開始</h3>
      </div>
      <div class="grid g3">
        <div class="card signal"><span class="what">SIGNAL 01 · 全球企業</span><span class="num">10 億+</span><b>OpenAI customers</b><p class="small">AI 已從少數實驗，進入跨產業的日常工作與產品。</p></div>
        <div class="card signal"><span class="what">SIGNAL 02 · 大型企業方法</span><span class="num">3,000 → 100,000+</span><b>BBVA employees</b><p class="small">先小規模導入、學習、訓練與治理，再逐步擴大。</p></div>
        <div class="card signal"><span class="what">SIGNAL 03 · 台灣產業政策</span><span class="num">311 億元</span><b>2026 AI 新十大建設預算</b><p class="small">政策重點從發展 AI，走向百工百業落地與中小微企業轉型。</p></div>
      </div>
      <p class="quote" style="border-left-color:var(--ai)">結論是同一句：可以先從 5 個人開始。</p>
    </div>

    <div class="block">
      <div class="block-head">
        <h3 class="h3">老闆想知道的不是 AI 強不強，而是能不能變成成果</h3>
      </div>
      <div class="grid g2">
        <div class="card">
          <div class="qlist">
            <div><span class="k">TIME</span><span>可以省多少時間？</span></div>
            <div><span class="k">PEOPLE</span><span>員工真的會用嗎？</span></div>
            <div><span class="k">SECURITY</span><span>公司資料安全嗎？</span></div>
            <div><span class="k">WORKFLOW</span><span>哪些工作值得先做？</span></div>
            <div><span class="k">ROI</span><span>能否持續使用、產生價值？</span></div>
          </div>
        </div>
        <div class="card" style="display:grid;gap:14px;align-content:start">
          <div><b>OECD 調查 5,000+ 家中小企業的導入疑慮</b><p class="small">大部分企業普遍缺的是「從哪裡開始」的方法。</p></div>
          <div class="bars">
            <div class="bar"><span class="lbl">法規／著作權疑慮</span><div class="track"><div class="fill" style="width:54%"></div></div><span class="v">54%</span></div>
            <div class="bar"><span class="lbl">擔心輸入資料去向</span><div class="track"><div class="fill" style="width:52%"></div></div><span class="v">52%</span></div>
            <div class="bar"><span class="lbl">員工技能不足</span><div class="track"><div class="fill" style="width:50%"></div></div><span class="v">50%</span></div>
          </div>
          <div class="axis"><span>0%</span><span>50%</span><span>100%</span></div>
        </div>
      </div>
    </div>

    <div class="block">
      <div class="block-head">
        <h3 class="h3">從個人擴散到部門，工作方式會截然不同</h3>
        <p>個人生產力是起點，新型態工作流才是企業真正的價值。點選階段看看每一步在做什麼。</p>
      </div>
      <StageExplorer />
    </div>

    <div class="block" id="k-pilot">
      <div class="block-head">
        <h3 class="h3">全公司導入前，先做快速、低風險的驗證</h3>
        <p>勾選你們已經具備的條件，看看試點準備到哪裡。</p>
      </div>
      <PilotChecklist />
    </div>

    <div class="block" id="k-tools">
      <div class="block-head">
        <h3 class="h3">不同的工作，用不同的 AI</h3>
        <p>選一種工作類型。關鍵依然是想解決什麼問題、達到什麼目標。</p>
      </div>
      <ToolPicker />
      <p class="small">Keynote 結尾：最好的時間，就是現在。</p>
    </div>
  </div>
</section>
</template>
