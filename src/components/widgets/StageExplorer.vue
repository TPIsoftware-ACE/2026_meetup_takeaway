<script setup>
import { computed, ref } from 'vue'
import { STAGES } from '../../data/content.js'

const current = ref(0)
const stage = computed(() => STAGES[current.value])
const meter = computed(() => `${(current.value + 1) / STAGES.length * 100}%`)
</script>

<template>
  <div class="card">
    <div class="stages" role="group" aria-label="導入階段">
      <button
        v-for="(s, i) in STAGES"
        :key="s.n"
        class="stage-btn"
        :aria-pressed="i === current"
        @click="current = i"
      ><span class="s">STAGE 0{{ i + 1 }}</span><span class="n">{{ s.n }}</span></button>
    </div>
    <div class="stage-meter"><i :style="{ width: meter }"></i></div>
    <div class="stage-panel" aria-live="polite">
      <div style="display:grid;gap:8px"><span class="eyebrow">STAGE 0{{ current + 1 }} · {{ stage.n }} · 範圍：{{ stage.scope }}</span><h3>{{ stage.zh }}</h3><p>{{ stage.look }}</p></div>
      <dl class="kv"><div><dt>這階段要回答</dt><dd>{{ stage.ask }}</dd></div><div><dt>往下一步</dt><dd>{{ stage.next }}</dd></div></dl>
    </div>
  </div>
</template>
