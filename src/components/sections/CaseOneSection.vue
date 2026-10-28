<script setup>
import WorkflowStepper from '../widgets/WorkflowStepper.vue'
import ReviewQuiz from '../widgets/ReviewQuiz.vue'
import RoleNotes from '../widgets/RoleNotes.vue'
</script>

<template>
  <section class="chapter" id="case1">
  <div class="wrap">
    <div class="chap-head">
      <div class="eyebrow">案例一 · 從對話到工作應用</div>
      <h2 class="h2">一條工作，到底怎麼跟 AI 一起完成？</h2>
      <div class="speaker"><b>Tim</b><span>AI Strategy Planner</span></div>
    </div>

    <div class="block">
      <div class="block-head">
        <h3 class="h3">原本我們怎麼準備一場會？</h3>
        <p>資訊分散在不同工具，真正花時間的是把碎片拼成工作脈絡。很多知識工作不是缺資料，而是缺「把資料變成下一步」的流程。</p>
      </div>
      <div class="sources">
        <div class="src"><b>Calendar</b><span>會議邀請：議程、與會者、時間</span></div>
        <div class="src"><b>Email</b><span>昨天的來信：要求、追蹤、附件</span></div>
        <div class="src"><b>Teams</b><span>聊天訊息：隱性待辦、最新進度</span></div>
        <div class="src"><b>SharePoint</b><span>週報文件：背景、數字、風險</span></div>
        <div class="join">→</div>
        <div class="brain"><b>人腦整合</b><span class="small">高耗能的認知處理</span><div class="steps5"><span>搜尋</span><span>閱讀</span><span>比對</span><span>記憶</span><span>整理</span></div></div>
      </div>
    </div>

    <div class="block" id="c1-flow">
      <div class="block-head">
        <h3 class="h3">不要先問 AI 可以做什麼，先看工作怎麼流動</h3>
        <p>以「10:00 UAT 進度會議」為例，一條工作拆成六段。點每一段，或用下方按鈕一步步走。</p>
      </div>
      <WorkflowStepper />
    </div>

    <div class="block" id="c1-review">
      <div class="block-head">
        <h3 class="h3">AI 沒報錯，不代表答案沒有風險</h3>
        <p>Human Review 不只是看錯字，而是確認事實、期限、責任與承諾。下面是 AI 寫進會前包的句子：你會用哪幾個檢查點攔下它？第一題取自簡報，後兩題依同一個情境延伸。</p>
      </div>
      <ReviewQuiz />
    </div>

    <div class="block">
      <div class="block-head">
        <h3 class="h3">同一場會議，不同角色需要不同的紀錄</h3>
        <p>先問「誰要看？」再決定紀錄格式。切換角色，看同一場 UAT 會議的紀錄長什麼樣子（內容為示意）。</p>
      </div>
      <RoleNotes />
      <div class="design3">
        <div><span class="mono">Role-aware Output</span><b>先問誰要看</b><p class="small">PM、主管、執行者需要的版本不同。</p></div>
        <div><span class="mono">Citation / Traceability</span><b>每個承諾都能回到來源</b><p class="small">決策、期限、承諾與負責人沒有明確來源，就標「需確認」。</p></div>
        <div><span class="mono">Human Review</span><b>人確認最後一哩</b><p class="small">AI 產出會前包或會議紀錄，人確認事實、責任、期限、決議與承諾。</p></div>
      </div>
    </div>
  </div>
</section>
</template>
