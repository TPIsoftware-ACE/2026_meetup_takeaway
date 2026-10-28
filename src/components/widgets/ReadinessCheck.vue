<script setup>
import { computed, ref } from 'vue'
import { RD, READINESS_GROUPS } from '../../data/content.js'
import { readinessLevel } from '../../utils/logic.js'

const total = READINESS_GROUPS.reduce((n, g) => n + g.items.length, 0)
const checked = ref([])
const score = computed(() => checked.value.length)
const level = computed(() => readinessLevel(RD, score.value))
</script>

<template>
  <div class="grid g3">
    <div v-for="g in READINESS_GROUPS" :key="g.title" class="card">
      <div class="eyebrow" style="margin-bottom:4px">{{ g.title }}</div>
      <label v-for="it in g.items" :key="it.t" class="check"><input v-model="checked" type="checkbox" :value="it.t"><span class="t">{{ it.t }}</span><span class="d">{{ it.d }}</span></label>
    </div>
    <div class="card" style="display:grid;gap:12px;align-content:start">
      <div class="score"><span class="num" data-out="score">{{ score }}</span><span class="small">/ {{ total }}</span></div>
      <div class="progress"><div class="track"><i :style="{ width: score / total * 100 + '%' }"></i></div></div>
      <b data-out="title">{{ level[1] }}</b>
      <p class="small" aria-live="polite">{{ level[2] }}</p>
      <p class="small">擁有工具不等於具備企業 AI 能力，落地需要一套導入機制。</p>
    </div>
  </div>
</template>
