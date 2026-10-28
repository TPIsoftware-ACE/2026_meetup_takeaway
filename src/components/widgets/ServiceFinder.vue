<script setup>
import { computed, ref } from 'vue'
import { F2, SERVICES } from '../../data/content.js'
import { resolveService } from '../../utils/logic.js'

const f1 = ref('no')
const f2 = ref('A')
const result = computed(() => resolveService(F2, f1.value, f2.value))

function setF1(v) {
  f1.value = v
  f2.value = result.value.pick
}
</script>

<template>
  <div class="card finder">
    <div class="fq">
      <span class="q">1. 現在有明確的 AI 改善目標嗎？</span>
      <div class="btnrow" role="group" aria-label="是否有明確目標">
        <button class="btn" data-f1="no" :aria-pressed="f1 === 'no'" @click="setF1('no')">還沒有，先建立導入基礎</button>
        <button class="btn" data-f1="yes" :aria-pressed="f1 === 'yes'" @click="setF1('yes')">已經有，進入實際改善</button>
      </div>
    </div>
    <div class="fq">
      <span class="q">{{ result.cfg.q }}</span>
      <div class="btnrow" role="group" aria-label="目前最需要">
        <button v-for="o in result.cfg.opts" :key="o[0]" class="btn" :data-f2="o[0]" :aria-pressed="o[0] === result.pick" @click="f2 = o[0]">{{ o[1] }}</button>
      </div>
    </div>
    <div class="svc">
      <div v-for="s in SERVICES" :key="s.L" :data-svc="s.L" :class="{ pick: s.L === result.pick, dim: !result.pool.includes(s.L) }"><span class="L">{{ s.L }}</span><span class="k">{{ s.k }}</span><b>{{ s.b }}</b><span class="small">{{ s.d }}</span></div>
    </div>
  </div>
</template>
