<script setup>
import QuestionFlip from '../widgets/QuestionFlip.vue'
import InterfaceTypes from '../widgets/InterfaceTypes.vue'
import GlossaryExplorer from '../widgets/GlossaryExplorer.vue'
</script>

<template>
  <section class="chapter" id="case3">
  <div class="wrap">
    <div class="chap-head">
      <div class="eyebrow">案例三 · Document → Interface</div>
      <h2 class="h2">從企業文件到互動報告：<br>Codex 的資訊轉化實戰</h2>
      <div class="speaker"><b>Blaze</b><span>Principal Engineer</span></div>
      <p class="lede">當 AI 縮短需求與開發的距離，我們可以重新選擇資訊被理解的方式。</p>
    </div>

    <div class="block">
      <div class="story">
        <div class="card" style="display:grid;gap:12px;align-content:start">
          <span class="eyebrow">Zoey 接到一個很普通的任務</span>
          <p class="task">「把 App 功能相關資訊整理一下，找個時間約個會議跟大家同步。」</p>
          <p class="small">資料都在，為什麼答案還是找不到？企業內不缺資訊取得，缺的是同步與理解。</p>
        </div>
        <div class="card" style="display:grid;gap:12px;align-content:start">
          <span class="eyebrow">Zoey 的第一個解法</span>
          <div class="docstack">
            <div class="docs" aria-hidden="true"><i class="doc"></i><i class="doc"></i><i class="doc"></i><i class="doc"></i><i class="doc"></i><i class="doc new"></i></div>
            <p><b>5 份文件</b> → 再寫出 <b style="color:var(--human)">第 6 份文件</b></p>
          </div>
          <p class="small">整理資訊，不等於降低理解成本。資訊很多不等於容易理解，資訊存在也不等於能完成任務。</p>
        </div>
      </div>
    </div>

    <div class="block" id="c3-shift">
      <div class="block-head">
        <h3 class="h3">第一個轉捩點：Zoey 換了一個問題</h3>
      </div>
      <QuestionFlip />
    </div>

    <div class="block">
      <div class="block-head">
        <h3 class="h3">同樣是企業資訊，為什麼介面不同？</h3>
        <p>使用者想做的事不同，介面就該不同。簡報用三份真實的 ChatGPT Enterprise 文件示範三種介面；這頁也各做了一個對應的例子。</p>
      </div>
      <InterfaceTypes />
    </div>

    <div class="block" id="c3-explore">
      <div class="block-head">
        <h3 class="h3">名詞探索：這場活動的關鍵字</h3>
        <p>用 Exploration Interface 的方式整理整份簡報的名詞。選分類、輸入關鍵字，點一筆看定義與出處。</p>
      </div>
      <GlossaryExplorer />
    </div>

    <div class="block">
      <div class="block-head">
        <h3 class="h3">第二個轉捩點：AI 正在縮短技術 Gap</h3>
        <p>以前要把資訊做成介面，得先回答怎麼做、成本多少、開發多久、誰要做，最後常常是「算了，先用 Excel 就好」。AI 降低的不只是寫程式的門檻，也降低了資訊如何被表達的門檻。</p>
      </div>
      <div class="grid g2">
        <div class="card" style="display:grid;gap:10px;align-content:start">
          <span class="eyebrow">過去，我們有所限制</span>
          <div class="compare-old"><span>Excel</span><span>PPT</span><span>Word</span><span>PDF</span></div>
          <span class="eyebrow" style="margin-top:8px">現在</span>
          <p class="num" style="font-size:28px">自由發揮</p>
          <p class="small">AI 縮短了資訊需求與資訊介面之間的距離。</p>
        </div>
        <div class="card">
          <div class="eyebrow" style="margin-bottom:8px">Codex 扮演的角色：協助者，不是故事主角</div>
          <ol class="seq">
            <li><div><b>資料蒐集整理</b></div></li>
            <li><div><b>使用者問題分析</b></div></li>
            <li><div><b>資料結構化</b></div></li>
            <li><div><b>選擇適合的介面</b></div></li>
            <li><div><b>Prototype 設計</b></div></li>
            <li><div><b>Test &amp; Iterate</b></div></li>
          </ol>
        </div>
      </div>
    </div>

    <div class="block">
      <div class="block-head">
        <h3 class="h3">Zoey 最後學會的不是怎麼做網站</h3>
        <p>而是重新設計資訊被理解的方式。三個問題，以及這一頁自己的答案：</p>
      </div>
      <div class="design3">
        <div><span class="mono">01 / TARGET AUDIENCE</span><b>誰要看？</b><p class="small">參加或錯過這場 Meetup，想把重點帶回公司的人。</p></div>
        <div><span class="mono">02 / USER GOAL</span><b>他要做什麼？</b><p class="small">快速抓到三個案例的方法，並判斷自己公司的下一步。</p></div>
        <div><span class="mono">03 / COMPREHENSION</span><b>怎樣才算看懂？</b><p class="small">能說出要從哪個部門、哪 3–5 個流程開始，以及誰負責 Review。</p></div>
      </div>
    </div>
  </div>
</section>
</template>
