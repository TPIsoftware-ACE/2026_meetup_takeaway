<script setup>
import { computed, ref } from 'vue'
import { CHECKS, QZ } from '../../data/content.js'
import { countHits, gradeCheck } from '../../utils/logic.js'

const qi = ref(0)
const picked = ref([])
const checked = ref(false)
const q = computed(() => QZ[qi.value])
const hits = computed(() => countHits(q.value.ans, picked.value))

function toggle(k) {
  if (checked.value) return
  picked.value = picked.value.includes(k) ? picked.value.filter(x => x !== k) : [...picked.value, k]
}
function nextQuestion() {
  qi.value = (qi.value + 1) % QZ.length
  picked.value = []
  checked.value = false
}
</script>

<template>
  <div class="card quiz">
    <div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:center">
      <span class="eyebrow">練習 {{ qi + 1 }} / {{ QZ.length }}</span>
      <div class="btnrow"></div>
    </div>
    <div class="said">
      <div class="ai-said"><span class="lab">AI 寫成</span><span class="txt">{{ q.ai }}</span></div>
      <div class="orig"><span class="lab">原始訊息</span><span class="txt">{{ checked ? q.orig : '先選檢查點，再按「檢查」揭曉' }}</span></div>
    </div>
    <div class="chk-row">
      <button
        v-for="c in CHECKS"
        :key="c.k"
        :class="['chk', checked && gradeCheck(q.ans, picked, c.k)]"
        :data-c="c.k"
        :aria-pressed="picked.includes(c.k)"
        :disabled="checked"
        @click="toggle(c.k)"
      ><b>{{ c.k }}</b><span>{{ c.q }}</span></button>
    </div>
    <div class="btnrow"><button class="btn primary" :disabled="checked || picked.length === 0" @click="checked = true">檢查</button><button class="btn" @click="nextQuestion">下一題</button></div>
    <div class="verdict" aria-live="polite">
      <template v-if="checked"><b>抓到 {{ hits }} / {{ q.ans.length }} 個重點檢查</b>（綠色＝抓到，琥珀＝漏掉）。{{ q.why }}</template>
      <template v-else>選出你認為這句話沒通過的檢查點，可以多選。</template>
    </div>
  </div>
</template>
