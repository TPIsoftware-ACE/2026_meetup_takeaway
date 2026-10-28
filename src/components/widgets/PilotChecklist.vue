<script setup>
import { computed, ref } from 'vue'
import { PILOT_ITEMS, PILOT_MSGS } from '../../data/content.js'

const checked = ref([])
const count = computed(() => checked.value.length)
</script>

<template>
  <div class="grid g2">
    <div class="card">
      <label v-for="(p, i) in PILOT_ITEMS" :key="p.t" class="check"><input v-model="checked" type="checkbox" :value="i"><span class="t">{{ p.t }}</span><span class="d">{{ p.d }}</span></label>
    </div>
    <div class="card" style="display:grid;gap:16px;align-content:start">
      <div class="progress"><div class="track"><i :style="{ width: count / PILOT_ITEMS.length * 100 + '%' }"></i></div><span class="mono">{{ count }} / {{ PILOT_ITEMS.length }}</span></div>
      <p aria-live="polite">{{ PILOT_MSGS[count] }}</p>
      <p class="quote">哪些工作困擾你？哪些工作需要腦力激盪？如果你有一個哈佛畢業的超級助理……</p>
      <p class="small">簡報建議每次試點都從這個問題開始找流程。</p>
    </div>
  </div>
</template>
