<script setup>
import FunctionCases from '../widgets/FunctionCases.vue'
import SavingsCalculator from '../widgets/SavingsCalculator.vue'
import WorkflowBuilder from '../widgets/WorkflowBuilder.vue'
</script>

<template>
  <section class="chapter" id="case2">
  <div class="wrap">
    <div class="chap-head">
      <div class="eyebrow">案例二 · 從個人工具到組織規格化應用</div>
      <h2 class="h2">一個人會用 AI，<br>不代表組織已經會用 AI</h2>
      <div class="speaker"><b>Tim</b><span>AI Strategy Planner · ACE AI Consulting &amp; Enablement</span></div>
    </div>

    <div class="block">
      <div class="ladder">
        <div><span class="eyebrow">個人高效應用</span><p>可以用 AI 整理會議、摘要文件、撰寫初稿，提升單點效率。</p></div>
        <div><span class="eyebrow">傳播與協作瓶頸</span><p>要給第二、第三個人一起用時，流程與對齊問題才開始出現。</p></div>
        <div><span class="eyebrow">組織規模化挑戰</span><p>資料安全、輸出標準、Review 機制與維護者，都從個人問題變成組織問題。</p></div>
      </div>
      <p class="small">很多需求一開始都是「你的 Prompt 怎麼設計？」但 Prompt 只是把預期結果講清楚，真正有價值的是整個「完成工作的方式」：給 AI 明確的工作規則，並讓人參與審核產出。</p>
    </div>

    <div class="block" id="c2-roles">
      <div class="block-head">
        <h3 class="h3">三個職能，三種重新設計</h3>
        <p>每個案例都不是「加一個 AI 工具」，而是把工作的終點往後推一步。</p>
      </div>
      <FunctionCases />
    </div>

    <div class="block" id="c2-calc">
      <div class="block-head">
        <h3 class="h3">換算到你的團隊</h3>
        <p>用簡報中的單次節省時間，試算一個團隊一個月能省下多少時間。實際效益依流程而異。</p>
      </div>
      <SavingsCalculator />
    </div>

    <div class="block">
      <div class="block-head">
        <h3 class="h3">如果只能一個人用，就還不能擴散</h3>
      </div>
      <div class="grid g2">
        <div class="card">
          <div class="eyebrow" style="margin-bottom:8px">常見卡點</div>
          <ul class="seq">
            <li><div><b>自己好用的簡報，同仁做不出相同結果</b></div></li>
            <li><div><b>資料來源相同，卻不知道怎麼整理成合適的內容</b></div></li>
            <li><div><b>報告做完了，跟主管的預期不同</b></div></li>
            <li><div><b>工具做完了，只有自己的工作能用</b></div></li>
          </ul>
        </div>
        <div class="card" style="display:grid;gap:16px;align-content:start">
          <p class="quote">這套方法，其他人能不能跟著做？</p>
          <p>做得出來，不等於值得擴散；能被複用，才有擴散價值。</p>
          <div class="flow" style="margin-top:4px">
            <div class="node" data-who="info"><span class="who">職能 Workflow</span><span class="nm">PM｜SA｜法務</span></div>
            <div class="arrow">→</div>
            <div class="node" data-who="ai"><span class="who">共用 Workflow</span><span class="nm">會議追蹤｜知識查詢</span></div>
            <div class="arrow">→</div>
            <div class="node" data-who="action"><span class="who">組織能力</span><span class="nm">工作流程知識庫</span></div>
          </div>
        </div>
      </div>
    </div>

    <div class="block" id="c2-seed">
      <div class="block-head">
        <h3 class="h3">ACE 可以幫忙，但擴散要靠企業種子</h3>
        <p>種子不是只會用 AI 的人，而是能找到問題、重設流程、推動複用的人。</p>
      </div>
      <div class="grid g2">
        <div class="card">
          <div class="eyebrow" style="margin-bottom:8px">ACE 陪組織重新設計流程</div>
          <ol class="seq">
            <li><div><b>Discover</b><span>找工作卡點</span></div></li>
            <li><div><b>Define</b><span>選案例</span></div></li>
            <li><div><b>Test</b><span>測試 AI 邊界</span></div></li>
            <li><div><b>Design</b><span>重新設計 Workflow</span></div></li>
            <li><div><b>Enable</b><span>真實使用者實作</span></div></li>
            <li><div><b>Iterate</b><span>回到現場修正</span></div></li>
          </ol>
        </div>
        <div class="card">
          <div class="eyebrow" style="margin-bottom:8px">種子擴散機制</div>
          <ol class="seq">
            <li><div><b>ACE 建立方法</b><span>建構標準與框架</span></div></li>
            <li><div><b>種子辨識場景</b><span>找出核心落地痛點</span></div></li>
            <li><div><b>各單位重設 Workflow</b><span>重新梳理、優化流程</span></div></li>
            <li><div><b>成熟案例進入 Library</b><span>沉澱為組織數位資產</span></div></li>
            <li><div><b>更多人複用</b><span>實現規模化效能擴散</span></div></li>
          </ol>
        </div>
      </div>
    </div>

    <div class="block" id="c2-asset">
      <div class="block-head">
        <h3 class="h3">讓 Workflow 成為組織資產</h3>
        <p>工具會改變，好的工作方法應該留下來。用簡報的七個欄位寫一張 Workflow 卡，缺哪一欄，卡片會告訴你會出什麼問題。</p>
      </div>
      <WorkflowBuilder />
    </div>
  </div>
</section>
</template>
