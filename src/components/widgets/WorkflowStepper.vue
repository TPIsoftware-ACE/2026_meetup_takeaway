<script setup>
import { computed, ref } from 'vue'
import { WF, WHO } from '../../data/content.js'

const cur = ref(0)
const step = computed(() => WF[cur.value])
const isLast = computed(() => cur.value === WF.length - 1)

function prev() { if (cur.value > 0) cur.value-- }
function next() { cur.value = isLast.value ? 0 : cur.value + 1 }
</script>

<template>
  <div class="card">
    <div class="flow" role="list">
      <template v-for="(s, i) in WF" :key="s.k">
        <span v-if="i" class="arrow" aria-hidden="true">→</span>
        <button
          class="node"
          :class="{ past: i < cur }"
          :data-who="s.who"
          role="listitem"
          :aria-current="i === cur ? 'step' : null"
          @click="cur = i"
        ><span class="who">{{ s.k }}</span><span class="nm">{{ s.t }}</span></button>
      </template>
    </div>
    <div class="wf-detail" aria-live="polite">
      <div style="display:grid;gap:8px"><span class="pill" :class="step.who" style="justify-self:start"><i class="dot"></i>{{ WHO[step.who] }} · 第 {{ cur + 1 }} / {{ WF.length }} 段</span><h4 class="h3">{{ step.k }}：{{ step.t }}</h4><p>{{ step.note }}</p></div>
      <div><span class="eyebrow">這一段包含</span><ul><li v-for="x in step.items" :key="x">{{ x }}</li></ul></div>
    </div>
    <div class="btnrow" style="margin-top:16px">
      <button class="btn" :disabled="cur === 0" @click="prev">← 上一步</button>
      <button class="btn primary" @click="next">{{ isLast ? '從頭再看' : '下一步 →' }}</button>
    </div>
  </div>
</template>
